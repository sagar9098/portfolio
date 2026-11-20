import { ArrowUp } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { SocialLinks } from '../common/SocialLinks';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-soft bg-ink-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="font-mono text-xs text-slate-500">{portfolio.footer.tagline}</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex items-center gap-3">
            <SocialLinks links={portfolio.socials} />
            <a
              href="#home"
              aria-label="Back to top"
              className="flex size-10 items-center justify-center rounded-xl border border-line bg-tint text-slate-400 transition-all hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-emerald-300"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © {year} {portfolio.personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
