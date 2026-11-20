import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, LoaderCircle } from 'lucide-react';
import type { Project, ProjectFilterId } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { scrollToSection } from '../../utils/scroll';
import { Button, isExternalUrl } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectFilter } from '../projects/ProjectFilter';

const ProjectDetailsModal = lazy(() => import('../projects/ProjectDetailsModal'));

function ModalLoading() {
  return (
    <div role="status" className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-sm">
      <LoaderCircle className="size-8 animate-spin text-emerald-400" aria-hidden="true" />
      <span className="sr-only">Loading project details…</span>
    </div>
  );
}

export function Projects() {
  const { projects } = portfolio;
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const counts = useMemo(() => {
    const result: Record<ProjectFilterId, number> = {
      all: projects.items.length,
      backend: 0,
      fullstack: 0,
      web: 0,
      mobile: 0,
    };
    projects.items.forEach((project) => {
      result[project.category] += 1;
    });
    return result;
  }, [projects.items]);

  const filtered = useMemo(
    () =>
      activeFilter === 'all' ? projects.items : projects.items.filter((project) => project.category === activeFilter),
    [activeFilter, projects.items],
  );

  const [expanded, setExpanded] = useState(false);
  const limit = projects.initialVisible && projects.initialVisible > 0 ? projects.initialVisible : filtered.length;
  const hiddenCount = Math.max(filtered.length - limit, 0);
  const visible = expanded ? filtered : filtered.slice(0, limit);

  const changeFilter = (id: ProjectFilterId) => {
    setActiveFilter(id);
    setExpanded(false);
  };

  const collapse = () => {
    setExpanded(false);
    // Bring the grid back into view so the visitor isn't left far below it.
    window.requestAnimationFrame(() => scrollToSection('projects'));
  };

  return (
    <Section id="projects" header={projects}>
      <ProjectFilter filters={projects.filters} active={activeFilter} counts={counts} onChange={changeFilter} />

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
      </p>

      {filtered.length === 0 ? (
        <EmptyState title={projects.emptyState.title} description={projects.emptyState.description} />
      ) : (
        <ul id="project-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} onViewDetails={setSelected} />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            aria-expanded={expanded}
            aria-controls="project-grid"
            onClick={expanded ? collapse : () => setExpanded(true)}
          >
            {expanded ? (
              <>
                {projects.showLessLabel ?? 'Show less'}
                <ChevronUp className="size-4" aria-hidden="true" />
              </>
            ) : (
              <>
                {projects.showMoreLabel ?? 'Show more'}
                <span className="rounded-md bg-tint-strong px-1.5 py-px font-mono text-xs text-slate-300">
                  +{hiddenCount}
                </span>
                <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      )}

      {projects.additional && projects.additional.length > 0 && (
        <Reveal className="mt-16">
          <h3 className="mb-5 font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
            {projects.additionalTitle ?? 'Other projects'}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.additional.map((item) => {
              const content = (
                <>
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400/70" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-medium text-slate-100">{item.title}</span>
                    {item.description && <span className="block text-xs text-slate-400">{item.description}</span>}
                  </span>
                </>
              );
              const className = 'glass flex h-full items-start gap-3 rounded-xl px-4 py-3';
              return (
                <li key={item.title}>
                  {item.url ? (
                    <a
                      href={item.url}
                      className={`${className} transition-colors hover:border-emerald-400/30`}
                      {...(isExternalUrl(item.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      )}

      <AnimatePresence>
        {selected && (
          <Suspense key={selected.slug} fallback={<ModalLoading />}>
            <ProjectDetailsModal project={selected} onClose={closeModal} />
          </Suspense>
        )}
      </AnimatePresence>
    </Section>
  );
}
