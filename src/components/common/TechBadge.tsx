import { cn } from '../../utils/cn';

interface TechBadgeProps {
  label: string;
  highlighted?: boolean;
  size?: 'sm' | 'md';
}

export function TechBadge({ label, highlighted = false, size = 'sm' }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border font-medium transition-colors',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        highlighted
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
          : 'border-line bg-tint text-slate-300',
      )}
    >
      {highlighted && <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />}
      {label}
    </span>
  );
}
