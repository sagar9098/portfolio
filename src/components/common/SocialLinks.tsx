import type { SocialLink } from '../../types/portfolio';
import { cn } from '../../utils/cn';
import { BrandIcon } from './BrandIcon';
import { isExternalUrl } from './Button';

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

/** Icon links for configured socials. Entries with an empty URL are skipped. */
export function SocialLinks({ links, className }: SocialLinksProps) {
  const visible = links.filter((link) => link.url.trim());
  if (!visible.length) return null;
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {visible.map((link) => (
        <li key={link.platform + link.url}>
          <a
            href={link.url}
            aria-label={link.label}
            title={link.label}
            className="flex size-10 items-center justify-center rounded-xl border border-line bg-tint text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-emerald-300"
            {...(isExternalUrl(link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <BrandIcon platform={link.platform} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
