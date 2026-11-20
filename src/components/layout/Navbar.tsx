import { useCallback, useState } from 'react';
import { m } from 'framer-motion';
import { Menu } from 'lucide-react';
import type { NavItem } from '../../types/portfolio';
import { portfolio } from '../../data/portfolio';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../utils/cn';
import { ButtonLink } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';

interface NavbarProps {
  items: NavItem[];
  activeId: string;
}

export function Navbar({ items, activeId }: NavbarProps) {
  const scrolled = useScrolled();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const hasContact = items.some((item) => item.id === 'contact');
  const linkItems = items.filter((item) => item.id !== 'contact');

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-line-soft bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {linkItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative isolate rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100',
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg border border-emerald-400/20 bg-emerald-400/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {portfolio.appearance.showToggle && <ThemeToggle />}
          {hasContact && (
            <div className="hidden lg:block">
              <ButtonLink href="#contact" size="sm">
                {portfolio.hero.ctas.contact}
              </ButtonLink>
            </div>
          )}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-xl border border-line bg-tint text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-300 lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} items={items} activeId={activeId} />
    </header>
  );
}
