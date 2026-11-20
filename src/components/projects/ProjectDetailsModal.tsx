import { useRef, type ReactNode } from 'react';
import { m } from 'framer-motion';
import { Check, Quote, X } from 'lucide-react';
import type { Project, ProjectImage } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { useDialog } from '../../hooks/useDialog';
import { cn } from '../../utils/cn';
import { TechBadge } from '../common/TechBadge';
import { ProjectLinks } from './ProjectLinks';
import { ProjectThumbnail } from './ProjectThumbnail';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

/** Phone-sized screenshots (narrow and tall) are shown in their own grid at phone proportions. */
function isPhoneShot(image: ProjectImage): boolean {
  return image.width <= 800 && image.height > image.width;
}

function GalleryImage({ image, className }: { image: ProjectImage; className: string }) {
  return (
    <a
      href={image.src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${image.alt} (open full size in a new tab)`}
      className={cn(
        'group block overflow-hidden rounded-xl border border-line bg-ink-800 transition-colors hover:border-emerald-400/40',
        className,
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    </a>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h4 className="mt-8 mb-3 font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">{children}</h4>;
}

/** Accessible project details dialog. Loaded lazily the first time a project is opened. */
export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, true, onClose);
  const titleId = `project-${project.slug}-title`;
  const gallery = project.gallery ?? [];
  const wideShots = gallery.filter((image) => !isPhoneShot(image));
  const phoneShots = gallery.filter(isPhoneShot);

  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Company', value: project.organization },
    { label: 'Client', value: project.client },
    { label: 'Industry', value: project.industry },
    { label: 'Location', value: project.clientLocation },
    { label: 'Duration', value: project.duration },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-ink-900 shadow-2xl sm:rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-xl border border-line bg-ink-950/70 text-slate-200 backdrop-blur transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <ProjectThumbnail project={project} eager className="aspect-[16/9] border-b border-line-soft" />

          <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-0.5 text-xs font-medium text-emerald-200">
                {portfolio.projects.categoryLabels[project.category]}
              </span>
              <span className="text-xs text-slate-500">{project.typeLabel}</span>
            </div>
            <h3 id={titleId} className="text-2xl font-bold text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-300">{project.description}</p>

            {meta.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {meta.map((item) => (
                  <div key={item.label} className="rounded-xl border border-line bg-tint p-4">
                    <dt className="text-[11px] tracking-wide text-slate-500 uppercase">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-100">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.challenge && (
              <>
                <Heading>The challenge</Heading>
                <p className="leading-relaxed text-slate-300">{project.challenge}</p>
              </>
            )}
            {project.solution && (
              <>
                <Heading>What was built</Heading>
                <p className="leading-relaxed text-slate-300">{project.solution}</p>
              </>
            )}

            {project.features.length > 0 && (
              <>
                <Heading>Key features</Heading>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Heading>Technology stack</Heading>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <TechBadge label={tech} size="md" />
                </li>
              ))}
            </ul>

            {(wideShots.length > 0 || phoneShots.length > 0) && (
              <>
                <Heading>Screenshots</Heading>
                {wideShots.length > 0 && (
                  <ul className="grid grid-cols-2 gap-3">
                    {wideShots.map((image) => (
                      <li key={image.src}>
                        <GalleryImage image={image} className="aspect-[16/10]" />
                      </li>
                    ))}
                  </ul>
                )}
                {phoneShots.length > 0 && (
                  <ul className={cn('grid grid-cols-3 gap-3 sm:grid-cols-4', wideShots.length > 0 && 'mt-3')}>
                    {phoneShots.map((image) => (
                      <li key={image.src}>
                        <GalleryImage image={image} className="aspect-[9/17]" />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {project.clientReview && (
              <figure className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-5 sm:p-6">
                <Quote className="mb-3 size-6 text-emerald-400/70" aria-hidden="true" />
                <blockquote className="leading-relaxed text-slate-200">“{project.clientReview.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-white">{project.clientReview.author}</span>
                  <span className="text-slate-400"> · {project.clientReview.role}</span>
                </figcaption>
              </figure>
            )}

            {project.note && <p className="mt-6 text-sm text-slate-500 italic">{project.note}</p>}

            <ProjectLinks project={project} size="md" className="mt-8" />
          </div>
        </div>
      </m.div>
    </div>
  );
}
