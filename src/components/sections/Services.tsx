import { portfolio } from '../../data/portfolio';
import { Icon } from '../common/Icon';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';

export function Services() {
  const { services } = portfolio;

  return (
    <Section id="services" header={services} className="bg-gradient-to-b from-transparent via-ink-900/60 to-transparent">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service, index) => (
          <Reveal as="li" key={service.title} delay={(index % 3) * 0.07}>
            <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 sm:p-7">
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 size-40 rounded-full bg-emerald-400/0 blur-2xl transition-colors duration-500 group-hover:bg-emerald-400/10"
              />
              <span className="mb-5 flex size-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-transform duration-300 group-hover:scale-110">
                <Icon name={service.icon} className="size-6" />
              </span>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
