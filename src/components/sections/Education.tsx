import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import type { EducationEntry } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { isExternalUrl } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';

function InstitutionLogo({ entry }: { entry: EducationEntry }) {
  // Logos sit on a literal white tile (not the themed `bg-white` token, which
  // flips in light mode) so official artwork renders correctly in both themes.
  return (
    <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-[#ffffff] p-2 shadow-sm sm:size-[72px]">
      {entry.logo ? (
        <img
          src={entry.logo.src}
          alt={entry.logo.alt}
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="size-full object-contain"
        />
      ) : (
        <GraduationCap className="size-7 text-[#047857]" aria-hidden="true" />
      )}
    </span>
  );
}

/** Education entries. Rendered only when entries exist (see App.tsx). */
export function Education() {
  const { education } = portfolio;

  return (
    <Section id="education" header={education}>
      <ul className="grid gap-5 md:grid-cols-2">
        {education.entries.map((entry, index) => {
          const years = `${entry.startYear} — ${entry.endYear ?? 'Present'}`;
          return (
            <Reveal as="li" key={entry.id} delay={(index % 2) * 0.08}>
              <article className="glass group flex h-full gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 sm:p-7">
                <InstitutionLogo entry={entry} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-snug font-semibold text-white">{entry.degree}</h3>
                  {entry.field && <p className="mt-0.5 text-sm text-slate-400">{entry.field}</p>}
                  <p className="mt-2 font-medium text-emerald-300">
                    {entry.institutionUrl ? (
                      <a
                        href={entry.institutionUrl}
                        className="underline-offset-4 hover:underline"
                        {...(isExternalUrl(entry.institutionUrl)
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {entry.institution}
                      </a>
                    ) : (
                      entry.institution
                    )}
                  </p>
                  {entry.affiliation && <p className="text-sm text-slate-400">Affiliated to {entry.affiliation}</p>}

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-4" aria-hidden="true" />
                      {years}
                    </span>
                    {entry.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden="true" />
                        {entry.location}
                      </span>
                    )}
                  </div>

                  {entry.highlights && entry.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-line-soft pt-4">
                      {entry.highlights.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-slate-300">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400/70" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
