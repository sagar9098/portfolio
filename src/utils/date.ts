const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function parseIsoDate(iso: string): Date {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid ISO date in portfolio config: "${iso}"`);
  return date;
}

/** "Jul 2025" */
export function formatMonthYear(iso: string): string {
  return monthYear.format(parseIsoDate(iso));
}

/** "Jul 2025 — Present" */
export function formatDateRange(startIso: string, endIso: string | undefined, presentLabel = 'Present'): string {
  return `${formatMonthYear(startIso)} — ${endIso ? formatMonthYear(endIso) : presentLabel}`;
}

/** Human duration between two dates, e.g. "1 yr 4 mos". End defaults to now. */
export function formatDuration(startIso: string, endIso?: string, now: Date = new Date()): string {
  const start = parseIsoDate(startIso);
  const end = endIso ? parseIsoDate(endIso) : now;
  let months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth()) + 1;
  if (end.getUTCDate() < start.getUTCDate()) months -= 1;
  months = Math.max(months, 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}
