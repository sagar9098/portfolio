import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ' +
  'disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-emerald-400 to-teal-400 text-ink-950 shadow-lg shadow-emerald-500/20 ' +
    'hover:shadow-emerald-400/40 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-line bg-tint text-slate-100 backdrop-blur ' +
    'hover:border-emerald-400/40 hover:bg-emerald-400/[0.08] hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-slate-300 hover:text-emerald-300 hover:bg-tint-strong',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonStyles(variant, size, className)} {...props} />;
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** Anchor styled as a button. External links open safely in a new tab. */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...props
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={buttonStyles(variant, size, className)}
      {...(isExternalUrl(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  );
}
