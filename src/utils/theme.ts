import type { ThemeMode } from '../types/portfolio';

/**
 * localStorage key for the visitor's chosen theme.
 * Shared by the pre-paint script (vite-plugin-seo.ts) and the runtime hook.
 * Keep this file free of browser-only code — it is imported at build time.
 */
export const THEME_STORAGE_KEY = 'portfolio-theme';

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark';
}
