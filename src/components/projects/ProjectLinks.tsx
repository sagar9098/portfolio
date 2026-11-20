import { ExternalLink } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { cn } from '../../utils/cn';
import { BrandIcon } from '../common/BrandIcon';
import { ButtonLink } from '../common/Button';

interface ProjectLinksProps {
  project: Project;
  size?: 'sm' | 'md';
  className?: string;
}

/** GitHub / live-demo buttons. Renders nothing when no real URLs are configured. */
export function ProjectLinks({ project, size = 'sm', className }: ProjectLinksProps) {
  const { githubUrl, liveUrl, title } = project;
  if (!githubUrl && !liveUrl) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {liveUrl && (
        <ButtonLink href={liveUrl} size={size} aria-label={`Open live demo of ${title} (opens in a new tab)`}>
          <ExternalLink className="size-4" aria-hidden="true" />
          Live Demo
        </ButtonLink>
      )}
      {githubUrl && (
        <ButtonLink
          href={githubUrl}
          size={size}
          variant="secondary"
          aria-label={`View ${title} source code on GitHub (opens in a new tab)`}
        >
          <BrandIcon platform="github" className="size-4" />
          GitHub
        </ButtonLink>
      )}
    </div>
  );
}
