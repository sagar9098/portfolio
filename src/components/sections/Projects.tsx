import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import type { Project, ProjectFilterId } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { isExternalUrl } from '../common/Button';
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

  const visible = useMemo(
    () =>
      activeFilter === 'all' ? projects.items : projects.items.filter((project) => project.category === activeFilter),
    [activeFilter, projects.items],
  );

  return (
    <Section id="projects" header={projects}>
      <ProjectFilter filters={projects.filters} active={activeFilter} counts={counts} onChange={setActiveFilter} />

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>

      {visible.length === 0 ? (
        <EmptyState title={projects.emptyState.title} description={projects.emptyState.description} />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} onViewDetails={setSelected} />
            ))}
          </AnimatePresence>
        </ul>
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
