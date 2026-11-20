import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { formatDateRange, formatDuration } from '../../utils/date';
import { isExternalUrl } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';
import { TechBadge } from '../common/TechBadge';

export function Experience() {
  const { experience } = portfolio;

  return (
    <Section id="experience" header={experience}>
      <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-10">
        {experience.entries.map((entry, index) => {
          const isCurrent = !entry.endDate;
          return (
            <Reveal as="li" key={entry.id} delay={index * 0.08} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-7 -left-[calc(1.5rem+5px)] flex size-2.5 sm:-left-[calc(2.5rem+5px)]"
              >
                {isCurrent && (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                )}
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 ring-4 ring-ink-950" />
              </span>

              <article className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-emerald-400/20 sm:p-8">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{entry.role}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-base text-emerald-300">
                      <Briefcase className="size-4" aria-hidden="true" />
                      {entry.companyUrl ? (
                        <a
                          href={entry.companyUrl}
                          className="underline-offset-4 hover:underline"
                          {...(isExternalUrl(entry.companyUrl) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {entry.company}
                        </a>
                      ) : (
                        entry.company
                      )}
                      {entry.employmentType && <span className="text-sm text-slate-400">· {entry.employmentType}</span>}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 text-sm text-slate-400 sm:items-end">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="size-4" aria-hidden="true" />
                      <time dateTime={entry.startDate}>{formatDateRange(entry.startDate, entry.endDate)}</time>
                    </span>
                    <span className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-200">
                          Current
                        </span>
                      )}
                      <span className="font-mono text-xs">{formatDuration(entry.startDate, entry.endDate)}</span>
                    </span>
                    {entry.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="size-4" aria-hidden="true" />
                        {entry.location}
                      </span>
                    )}
                  </div>
                </header>

                {entry.summary && <p className="mt-5 leading-relaxed text-slate-300">{entry.summary}</p>}

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {entry.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                {entry.technologies.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-5" aria-label="Technologies used">
                    {entry.technologies.map((tech) => (
                      <li key={tech}>
                        <TechBadge label={tech} />
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
