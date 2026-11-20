import { useRef, type MouseEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import type { NavItem } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { useDialog } from '../../hooks/useDialog';
import { cn } from '../../utils/cn';
import { scrollToSection } from '../../utils/scroll';
import { ResumeButton } from '../common/ResumeButton';
import { SocialLinks } from '../common/SocialLinks';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId: string;
}

export function MobileDrawer({ open, onClose, items, activeId }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, open, onClose);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onClose();
    // Wait for the scroll lock to be released before scrolling.
    window.setTimeout(() => scrollToSection(id), 60);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <m.div
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col border-l border-line bg-ink-900 px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex size-10 items-center justify-center rounded-xl border border-line text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {items.map((item, index) => {
                const isActive = activeId === item.id;
                return (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavigate(event, item.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-emerald-400/10 text-emerald-200'
                          : 'text-slate-300 hover:bg-tint-strong hover:text-white',
                      )}
                    >
                      {item.label}
                      {isActive && <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />}
                    </a>
                  </m.li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-col gap-4 border-t border-line-soft pt-6 empty:hidden">
              <ResumeButton label={portfolio.hero.ctas.resume} size="md" className="w-full" />
              <SocialLinks links={portfolio.socials} />
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
