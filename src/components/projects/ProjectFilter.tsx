import { m } from 'framer-motion';
import type { ProjectFilter as ProjectFilterOption, ProjectFilterId } from '../../types/portfolio';
import { cn } from '../../utils/cn';

interface ProjectFilterProps {
  filters: ProjectFilterOption[];
  active: ProjectFilterId;
  counts: Record<ProjectFilterId, number>;
  onChange: (id: ProjectFilterId) => void;
}

export function ProjectFilter({ filters, active, counts, onChange }: ProjectFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((filter) => {
        const isActive = filter.id === active;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
            className={cn(
              'relative isolate inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-emerald-400/40 text-ink-950'
                : 'border-line bg-tint text-slate-300 hover:border-line-strong hover:text-white',
            )}
          >
            {isActive && (
              <m.span
                layoutId="project-filter-active"
                className="absolute inset-0 -z-10 rounded-[11px] bg-gradient-to-r from-emerald-400 to-teal-400"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {filter.label}
            <span
              className={cn(
                'rounded-md px-1.5 py-px font-mono text-[11px]',
                isActive ? 'bg-ink-950/15 text-ink-950' : 'bg-tint-strong text-slate-400',
              )}
            >
              {counts[filter.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
