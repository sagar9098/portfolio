import { Briefcase, Calendar, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { portfolio } from '../../data/portfolio';
import { formatMonthYear } from '../../utils/date';
import { Icon } from '../common/Icon';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
        {icon}
      </span>
      <div>
        <dt className="text-xs tracking-wide text-slate-500 uppercase">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium text-slate-100">{value}</dd>
      </div>
    </div>
  );
}

export function About() {
  const { about, personal, experience } = portfolio;
  const current = experience.entries.find((entry) => !entry.endDate);

  return (
    <Section id="about" header={about}>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="glass space-y-5 rounded-2xl p-6">
            {current && (
              <>
                <Fact
                  icon={<Briefcase className="size-4" aria-hidden="true" />}
                  label="Current role"
                  value={`${current.role} · ${current.company}`}
                />
                <Fact
                  icon={<Calendar className="size-4" aria-hidden="true" />}
                  label="Since"
                  value={formatMonthYear(current.startDate)}
                />
              </>
            )}
            {personal.location && (
              <Fact icon={<MapPin className="size-4" aria-hidden="true" />} label="Location" value={personal.location} />
            )}
            <Fact
              icon={<Icon name="layers" className="size-4" />}
              label="Focus"
              value={portfolio.footer.tagline}
            />
          </dl>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.highlights.map((highlight, index) => (
          <Reveal as="li" key={highlight.title} delay={(index % 4) * 0.06}>
            <div className="glass group h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25">
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 transition-colors group-hover:bg-emerald-400/20">
                <Icon name={highlight.icon} className="size-5" />
              </span>
              <h3 className="font-semibold text-white">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{highlight.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
