import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CircleCheck, CircleX, LoaderCircle, Send } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { cn } from '../../utils/cn';
import {
  CONTACT_LIMITS,
  validateContactField,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../../utils/contactValidation';
import { Button } from '../common/Button';

type Status = { state: 'idle' } | { state: 'submitting' } | { state: 'success' } | { state: 'error'; message: string };

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', subject: '', message: '' };
const REQUEST_TIMEOUT_MS = 15_000;

interface FieldConfig {
  name: keyof ContactFormValues;
  label: string;
  type: 'text' | 'email' | 'textarea';
  autoComplete: string;
  placeholder: string;
  maxLength: number;
}

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name', maxLength: CONTACT_LIMITS.name.max },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com', maxLength: CONTACT_LIMITS.email.max },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'What is this about?', maxLength: CONTACT_LIMITS.subject.max },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off', placeholder: 'Tell me about the role or project…', maxLength: CONTACT_LIMITS.message.max },
];

const inputClass =
  'w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 transition-colors ' +
  'focus:outline-none focus:ring-2 focus:ring-emerald-400/40';

export function ContactForm() {
  const { contact } = portfolio;
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  // Spam protection: hidden honeypot field + time the form was first rendered.
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ContactFormValues;
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateContactField(field, value) }));
    if (status.state === 'error') setStatus({ state: 'idle' });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ContactFormValues;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateContactField(field, event.target.value) }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === 'submitting') return;

    const validation = validateContactForm(values);
    setErrors(validation);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = FIELDS.find((field) => validation[field.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus({ state: 'submitting' });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          website: honeypot,
          elapsedMs: Date.now() - startedAt.current,
        }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || contact.fallbackErrorMessage);
      }
      setStatus({ state: 'success' });
      setValues(INITIAL_VALUES);
      setTouched({});
      setErrors({});
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The request timed out. Please check your connection and try again.'
          : error instanceof Error && error.message
            ? error.message
            : contact.fallbackErrorMessage;
      setStatus({ state: 'error', message });
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const submitting = status.state === 'submitting';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="glass relative rounded-2xl p-6 sm:p-8" aria-busy={submitting}>
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = `contact-${field.name}`;
          const error = touched[field.name] ? errors[field.name] : undefined;
          const describedBy = error ? `${id}-error` : undefined;
          const shared = {
            id,
            name: field.name,
            value: values[field.name],
            onChange: handleChange,
            onBlur: handleBlur,
            placeholder: field.placeholder,
            autoComplete: field.autoComplete,
            maxLength: field.maxLength,
            required: true,
            disabled: submitting,
            'aria-invalid': Boolean(error),
            'aria-describedby': describedBy,
            className: cn(
              inputClass,
              error ? 'border-rose-400/60' : 'border-line hover:border-line-strong focus:border-emerald-400/50',
            ),
          };
          return (
            <div key={field.name} className={cn(field.type === 'textarea' || field.name === 'subject' ? 'sm:col-span-2' : '')}>
              <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-200">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea {...shared} rows={6} className={cn(shared.className, 'resize-y')} />
              ) : (
                <input {...shared} type={field.type} inputMode={field.type === 'email' ? 'email' : undefined} />
              )}
              {error && (
                <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-300">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot: invisible to humans, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          {status.state === 'success' && (
            <m.p
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100"
            >
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
              {contact.successMessage}
            </m.p>
          )}
          {status.state === 'error' && (
            <m.p
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-100"
            >
              <CircleX className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden="true" />
              <span>
                {status.message}
                {contact.email && (
                  <>
                    {' '}
                    You can also email me directly at{' '}
                    <a href={`mailto:${contact.email}`} className="font-medium underline underline-offset-2">
                      {contact.email}
                    </a>
                    .
                  </>
                )}
              </span>
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
