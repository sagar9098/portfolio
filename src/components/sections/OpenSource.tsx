import { ArrowUpRight, Package } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { BrandIcon } from '../common/BrandIcon';
import { ButtonLink } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';
import { TechBadge } from '../common/TechBadge';

const linkClass =
  'inline-flex items-center gap-1.5 rounded-lg border border-line bg-tint px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300';

/** Open-source packages and tools. Rendered only when items exist (see App.tsx). */
export function OpenSource() {
  const { openSource } = portfolio;

  return (
    <Section id="opensource" header={openSource}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {openSource.items.map((item, index) => (
          <Reveal as="li" key={item.name} delay={(index % 3) * 0.07}>
            <article className="glass group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25">
              <header className="mb-4 flex items-start justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <Package className="size-5" aria-hidden="true" />
                </span>
                {item.packageUrl && (
                  <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-200">
                    Published
                  </span>
                )}
              </header>
              <h3 className="font-mono text-base font-semibold break-all text-white">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <TechBadge label={tag} />
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line-soft pt-4">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  aria-label={`${item.name} source code on GitHub (opens in a new tab)`}
                >
                  <BrandIcon platform="github" className="size-3.5" />
                  Source
                </a>
                {item.packageUrl && (
                  <a
                    href={item.packageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`${item.name} package page (opens in a new tab)`}
                  >
                    <Package className="size-3.5" aria-hidden="true" />
                    Package
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      {openSource.profileUrl && (
        <Reveal className="mt-10 flex justify-center">
          <ButtonLink href={openSource.profileUrl} variant="secondary">
            <BrandIcon platform="github" className="size-4" />
            {openSource.profileLabel ?? 'View more on GitHub'}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      )}
    </Section>
  );
}
