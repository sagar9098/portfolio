import { portfolio } from '../../data/portfolio';
import { Icon } from '../common/Icon';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';
import { TechBadge } from '../common/TechBadge';

export function Skills() {
  const { skills } = portfolio;

  return (
    <Section id="skills" header={skills} className="bg-gradient-to-b from-transparent via-ink-900/60 to-transparent">
      <div className="mb-8 -mt-6 flex items-center gap-2 text-xs text-slate-400">
        <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        {skills.primaryLegend}
      </div>
      <ul className="grid gap-5 md:grid-cols-2">
        {skills.categories.map((category, index) => (
          <Reveal as="li" key={category.id} delay={(index % 2) * 0.08}>
            <article className="glass h-full rounded-2xl p-6 transition-colors duration-300 hover:border-emerald-400/20 sm:p-7">
              <header className="mb-5 flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/5 text-emerald-300">
                  <Icon name={category.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                  <p className="text-sm text-slate-400">{category.description}</p>
                </div>
              </header>
              <ul className="flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <TechBadge label={skill.name} highlighted={skill.primary} size="md" />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
