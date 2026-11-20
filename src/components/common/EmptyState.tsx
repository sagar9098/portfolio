import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div role="status" className="glass flex flex-col items-center rounded-2xl px-6 py-16 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        <FolderOpen className="size-6" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
