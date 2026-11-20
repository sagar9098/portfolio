/**
 * POST /api/contact — Vercel serverless function.
 *
 * Validates the contact form server-side, applies spam protection and
 * delivers the message through the Resend HTTP API. Secrets live only in
 * server-side environment variables (see .env.example) and are never sent
 * to the browser.
 *
 * Validation limits mirror src/utils/contactValidation.ts. The function is
 * intentionally self-contained so Vercel can bundle it without touching the
 * frontend source tree.
 */

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 16 * 1024;
/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_TIME_MS = 3000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

/**
 * Best-effort, per-instance rate limiter. Serverless instances are ephemeral,
 * so pair this with Vercel Firewall rules for stronger guarantees.
 */
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string, now = Date.now()): boolean {
  const windowStart = now - RATE_LIMIT.windowMs;
  const timestamps = (recentRequests.get(key) ?? []).filter((t) => t > windowStart);
  timestamps.push(now);
  recentRequests.set(key, timestamps);
  if (recentRequests.size > 5000) {
    for (const [k, list] of recentRequests) {
      if (!list.some((t) => t > windowStart)) recentRequests.delete(k);
    }
  }
  return timestamps.length > RATE_LIMIT.max;
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Removes CR/LF so user input can never inject extra email headers. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === 'string' ? value.trim() : '';
}

function validate(input: Record<string, unknown>): { data?: ContactPayload; error?: string } {
  const data: ContactPayload = {
    name: singleLine(readString(input, 'name')),
    email: singleLine(readString(input, 'email')),
    subject: singleLine(readString(input, 'subject')),
    message: readString(input, 'message'),
  };
  if (data.name.length < LIMITS.name.min || data.name.length > LIMITS.name.max) return { error: 'Please provide a valid name.' };
  if (data.email.length > LIMITS.email.max || !EMAIL_PATTERN.test(data.email))
    return { error: 'Please provide a valid email address.' };
  if (data.subject.length < LIMITS.subject.min || data.subject.length > LIMITS.subject.max)
    return { error: 'Please provide a valid subject.' };
  if (data.message.length < LIMITS.message.min || data.message.length > LIMITS.message.max)
    return { error: `Message must be between ${LIMITS.message.min} and ${LIMITS.message.max} characters.` };
  return { data };
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  // Non-browser clients may omit Origin; other protections still apply.
  if (!origin) return true;
  const configured = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean);
  if (configured.length) return configured.includes(origin);
  try {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? new URL(request.url).host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function sendEmail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new Error('MISSING_CONFIG');
  }

  const html = `
    <h2 style="margin:0 0 12px">New portfolio message</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  `;
  const text = `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\n${payload.message}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((address) => address.trim()),
      reply_to: payload.email,
      subject: `[Portfolio] ${payload.subject}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error('Resend API error', response.status, await response.text().catch(() => ''));
    return false;
  }
  return true;
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) return json(403, { ok: false, error: 'Forbidden.' });

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json(415, { ok: false, error: 'Unsupported content type.' });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return json(429, { ok: false, error: 'Too many messages. Please try again in a few minutes.' });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json(400, { ok: false, error: 'Invalid request body.' });
  }
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'Message is too large.' });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'Invalid request body.' });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json(400, { ok: false, error: 'Invalid request body.' });
  }
  const input = body as Record<string, unknown>;

  // Spam checks: filled honeypot or implausibly fast submission. Respond with
  // success so bots get no signal, but do not send anything.
  const honeypot = readString(input, 'website');
  const elapsed = typeof input.elapsedMs === 'number' ? input.elapsedMs : 0;
  if (honeypot || elapsed < MIN_FILL_TIME_MS) {
    return json(200, { ok: true });
  }

  const { data, error } = validate(input);
  if (!data) return json(422, { ok: false, error: error ?? 'Invalid input.' });

  try {
    const sent = await sendEmail(data);
    if (!sent) return json(502, { ok: false, error: 'The message could not be delivered. Please try again later.' });
    return json(200, { ok: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'MISSING_CONFIG') {
      console.error('Contact form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.');
      return json(503, { ok: false, error: 'The contact form is temporarily unavailable.' });
    }
    console.error('Contact form error', err);
    return json(500, { ok: false, error: 'Something went wrong. Please try again later.' });
  }
}
