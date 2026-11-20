import type { Project, ProjectCategory } from '../../types/portfolio';
import type { IconName } from '../../types/portfolio';
import { cn } from '../../utils/cn';
import { Icon } from '../common/Icon';

const CATEGORY_STYLE: Record<ProjectCategory, { icon: IconName; gradient: string }> = {
  mobile: { icon: 'smartphone', gradient: 'from-emerald-500/25 via-teal-500/10 to-transparent' },
  web: { icon: 'globe', gradient: 'from-sky-500/25 via-teal-500/10 to-transparent' },
  fullstack: { icon: 'layers', gradient: 'from-teal-400/25 via-emerald-500/10 to-transparent' },
  backend: { icon: 'server', gradient: 'from-indigo-500/25 via-emerald-500/10 to-transparent' },
};

interface ProjectThumbnailProps {
  project: Project;
  className?: string;
  /** Load eagerly (e.g. inside an opened dialog). */
  eager?: boolean;
}

/**
 * Shows the configured screenshot, or a generated, category-themed cover
 * when no image has been provided — never a fake screenshot.
 */
export function ProjectThumbnail({ project, className, eager = false }: ProjectThumbnailProps) {
  if (project.image) {
    return (
      <div className={cn('relative overflow-hidden bg-ink-800', className)}>
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  const style = CATEGORY_STYLE[project.category];
  return (
    <div
      aria-hidden="true"
      className={cn('relative flex items-center justify-center overflow-hidden bg-ink-800', className)}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', style.gradient)} />
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative flex max-w-full flex-col items-center gap-3 px-6 text-center transition-transform duration-500 group-hover:scale-105">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-line bg-ink-900/70 text-emerald-300 shadow-xl backdrop-blur">
          <Icon name={style.icon} className="size-7" />
        </span>
        <span className="font-mono text-sm font-medium tracking-wide text-slate-200">{project.title}</span>
      </div>
    </div>
  );
}
