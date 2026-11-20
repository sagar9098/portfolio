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

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M3.6 1.8a1.5 1.5 0 0 0-.6 1.2v18a1.5 1.5 0 0 0 .6 1.2l10.1-10.2L3.6 1.8Zm11.5 11.6 2.7 2.7-11.9 6.8 9.2-9.5Zm0-2.8L5.9 1.1l11.9 6.8-2.7 2.7Zm4.1-1.9 2.5 1.4a1.5 1.5 0 0 1 0 2.6l-2.5 1.4L16.3 12l2.9-3.3Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28Z" />
    </svg>
  );
}

/** Live demo / store / GitHub buttons. Renders nothing when no real URLs are configured. */
export function ProjectLinks({ project, size = 'sm', className }: ProjectLinksProps) {
  const { githubUrl, liveUrl, playStoreUrl, appStoreUrl, title } = project;
  if (!githubUrl && !liveUrl && !playStoreUrl && !appStoreUrl) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {liveUrl && (
        <ButtonLink href={liveUrl} size={size} aria-label={`Open live demo of ${title} (opens in a new tab)`}>
          <ExternalLink className="size-4" aria-hidden="true" />
          Live Demo
        </ButtonLink>
      )}
      {playStoreUrl && (
        <ButtonLink
          href={playStoreUrl}
          size={size}
          variant={liveUrl ? 'secondary' : 'primary'}
          aria-label={`Get ${title} on Google Play (opens in a new tab)`}
        >
          <GooglePlayIcon />
          Google Play
        </ButtonLink>
      )}
      {appStoreUrl && (
        <ButtonLink
          href={appStoreUrl}
          size={size}
          variant="secondary"
          aria-label={`Download ${title} on the App Store (opens in a new tab)`}
        >
          <AppleIcon />
          App Store
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
