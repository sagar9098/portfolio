import { Mail, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { portfolio } from '../../data/portfolio';
import { BrandIcon } from '../common/BrandIcon';
import { isExternalUrl } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';
import { ContactForm } from './ContactForm';

interface ContactMethod {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
}

export function Contact() {
  const { contact, socials } = portfolio;

  const methods: ContactMethod[] = [
    ...(contact.email
      ? [{ key: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: <Mail className="size-5" aria-hidden="true" /> }]
      : []),
    ...(contact.phone
      ? [{ key: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, '')}`, icon: <Phone className="size-5" aria-hidden="true" /> }]
      : []),
    ...socials
      .filter((social) => social.url.trim() && social.platform !== 'email')
      .map((social) => ({
        key: social.platform,
        label: social.label,
        value: displayUrl(social.url),
        href: social.url,
        icon: <BrandIcon platform={social.platform} className="size-5" />,
      })),
  ];

  return (
    <Section id="contact" header={contact}>
      <div className={methods.length ? 'grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-10' : 'max-w-3xl'}>
        {methods.length > 0 && (
          <Reveal>
            <ul className="space-y-3">
              {methods.map((method) => (
                <li key={method.key}>
                  <a
                    href={method.href}
                    className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/25"
                    {...(isExternalUrl(method.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 transition-colors group-hover:bg-emerald-400/20">
                      {method.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-wide text-slate-500 uppercase">{method.label}</span>
                      <span className="block truncate text-sm font-medium text-slate-100">{method.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
