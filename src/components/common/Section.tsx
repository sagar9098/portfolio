import type { ReactNode } from 'react';
import type { SectionHeader, SectionId } from '../../types/portfolio';
import { cn } from '../../utils/cn';
import { Reveal } from './Reveal';

interface SectionProps {
  id: SectionId;
  header?: SectionHeader;
  className?: string;
  children: ReactNode;
}

/** Consistent section shell: anchor id, container width, vertical rhythm and heading. */
export function Section({ id, header, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={header ? headingId : undefined}
      className={cn('relative py-20 sm:py-28', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {header && <SectionHeading id={headingId} {...header} />}
        {children}
      </div>
    </section>
  );
}

function SectionHeading({ id, eyebrow, title, description }: SectionHeader & { id: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
        <span className="h-px w-6 bg-emerald-400/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
