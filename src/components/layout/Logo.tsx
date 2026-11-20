import { portfolio } from '../../data/portfolio';

export function Logo() {
  const { name, shortName } = portfolio.personal;
  return (
    <a href="#home" className="group flex items-center gap-2.5 rounded-lg" aria-label={`${name} — back to top`}>
      <span className="flex size-9 items-center justify-center rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/20 to-teal-400/5 font-mono text-sm font-semibold text-emerald-300 transition-transform duration-300 group-hover:rotate-6">
        {shortName}
      </span>
      <span className="text-base font-semibold tracking-tight text-white">{name}</span>
    </a>
  );
}
