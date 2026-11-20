import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '../types/portfolio';
import { portfolio } from '../data/portfolio';
import { isThemeMode, THEME_STORAGE_KEY } from '../utils/theme';

function readStored(): ThemeMode | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(value) ? value : null;
  } catch {
    return null;
  }
}

function writeStored(mode: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Storage may be unavailable (private mode, blocked site data) — the
    // theme still switches for this visit.
  }
}

function systemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(mode: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', mode);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', portfolio.appearance.themeColor[mode]);
}

/**
 * Current theme plus a toggle. The initial value comes from <html data-theme>,
 * which the pre-paint script in index.html has already set.
 */
export function useTheme(): { theme: ThemeMode; toggleTheme: () => void } {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    return isThemeMode(attr) ? attr : 'dark';
  });

  // Follow OS changes while the visitor hasn't picked a theme explicitly.
  useEffect(() => {
    if (portfolio.appearance.defaultMode !== 'system') return;
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (readStored()) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      writeStored(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
