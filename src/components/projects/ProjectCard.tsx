import { forwardRef } from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { TechBadge } from '../common/TechBadge';
import { ProjectLinks } from './ProjectLinks';
import { ProjectThumbnail } from './ProjectThumbnail';

const MAX_VISIBLE_TECH = 5;

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard = forwardRef<HTMLLIElement, ProjectCardProps>(function ProjectCard(
  { project, onViewDetails },
  ref,
) {
  const visibleTech = project.technologies.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = project.technologies.length - visibleTech.length;

  return (
    <m.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:shadow-2xl hover:shadow-emerald-500/5">
        <ProjectThumbnail project={project} className="aspect-[16/10] border-b border-line-soft" />

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-0.5 text-xs font-medium text-emerald-200">
              {portfolio.projects.categoryLabels[project.category]}
            </span>
            <span className="truncate text-xs text-slate-500">{project.typeLabel}</span>
          </div>

          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          {(project.industry || project.organization) && (
            <p className="mt-1 text-xs text-slate-500">
              {[project.industry, project.organization].filter(Boolean).join(' · ')}
            </p>
          )}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {visibleTech.map((tech) => (
              <li key={tech}>
                <TechBadge label={tech} />
              </li>
            ))}
            {hiddenCount > 0 && (
              <li>
                <TechBadge label={`+${hiddenCount}`} />
              </li>
            )}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-5">
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
            >
              View Details
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">about {project.title}</span>
            </button>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </m.li>
  );
});
