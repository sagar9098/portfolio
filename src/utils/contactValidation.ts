/**
 * Client-side validation for the contact form.
 * The serverless function (api/contact.ts) re-validates everything with the
 * same limits — never trust the client alone.
 */
export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return email.length <= CONTACT_LIMITS.email.max && EMAIL_PATTERN.test(email);
}

export function validateContactField(field: keyof ContactFormValues, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your name.';
      if (value.length < CONTACT_LIMITS.name.min) return 'Name looks too short.';
      if (value.length > CONTACT_LIMITS.name.max) return `Name must be under ${CONTACT_LIMITS.name.max} characters.`;
      return undefined;
    case 'email':
      if (!value) return 'Please enter your email address.';
      if (!isValidEmail(value)) return 'Please enter a valid email address.';
      return undefined;
    case 'subject':
      if (!value) return 'Please add a subject.';
      if (value.length < CONTACT_LIMITS.subject.min) return 'Subject looks too short.';
      if (value.length > CONTACT_LIMITS.subject.max)
        return `Subject must be under ${CONTACT_LIMITS.subject.max} characters.`;
      return undefined;
    case 'message':
      if (!value) return 'Please write a message.';
      if (value.length < CONTACT_LIMITS.message.min)
        return `Message should be at least ${CONTACT_LIMITS.message.min} characters.`;
      if (value.length > CONTACT_LIMITS.message.max)
        return `Message must be under ${CONTACT_LIMITS.message.max} characters.`;
      return undefined;
  }
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  (Object.keys(values) as Array<keyof ContactFormValues>).forEach((field) => {
    const error = validateContactField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}
