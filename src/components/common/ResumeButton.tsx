import { Download } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { useResourceAvailable } from '../../hooks/useResourceAvailable';
import { buttonStyles, isExternalUrl, type ButtonSize, type ButtonVariant } from './Button';

interface ResumeButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Download button that appears only once the configured resume file is confirmed to exist. */
export function ResumeButton({ label, variant = 'secondary', size = 'lg', className }: ResumeButtonProps) {
  const { url, fileName } = portfolio.resume;
  const status = useResourceAvailable(url);

  return (
    <AnimatePresence>
      {status === 'available' && (
        <m.a
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          href={url}
          className={buttonStyles(variant, size, className)}
          {...(isExternalUrl(url) ? { target: '_blank', rel: 'noopener noreferrer' } : { download: fileName })}
        >
          <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          {label}
        </m.a>
      )}
    </AnimatePresence>
  );
}
