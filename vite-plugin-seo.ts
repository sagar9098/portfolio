/**
 * Build-time SEO plugin.
 *
 * Reads src/data/portfolio.ts and:
 *  • injects <title>, meta description, canonical, Open Graph, Twitter and
 *    JSON-LD tags into index.html (so crawlers and link previews see them
 *    without running JavaScript);
 *  • emits robots.txt and sitemap.xml into the build output.
 */
import type { Plugin } from 'vite';
import { portfolio } from './src/data/portfolio.ts';
import { THEME_STORAGE_KEY } from './src/utils/theme.ts';

const HEAD_PLACEHOLDER = '<!--seo-head-->';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/** Resolve the canonical site URL: config → SITE_URL env → Vercel production domain. */
export function resolveSiteUrl(): string {
  const fromConfig = portfolio.seo.siteUrl.trim();
  if (fromConfig) return stripTrailingSlash(fromConfig);
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return stripTrailingSlash(fromEnv);
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) return `https://${stripTrailingSlash(vercelDomain)}`;
  return '';
}

function absoluteUrl(siteUrl: string, pathOrUrl: string): string {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!siteUrl) return '';
  return `${siteUrl}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/**
 * Runs before first paint: applies the saved theme (or the configured /
 * system default) to <html data-theme> so there is no flash of the wrong theme.
 */
function buildThemeScript(): string {
  const { defaultMode, themeColor } = portfolio.appearance;
  const config = JSON.stringify({ key: THEME_STORAGE_KEY, mode: defaultMode, colors: themeColor });
  const code =
    `(function(c){var t;try{t=localStorage.getItem(c.key)}catch(e){}` +
    `if(t!=='light'&&t!=='dark'){t=c.mode==='system'?(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):c.mode}` +
    `document.documentElement.setAttribute('data-theme',t);` +
    `var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',c.colors[t])})(${config.replace(/</g, '\\u003c')});`;
  return `<script>${code}</script>`;
}

function buildHeadTags(siteUrl: string): string {
  const { seo, personal, socials, experience, appearance } = portfolio;
  const ogImage = absoluteUrl(siteUrl, seo.ogImage);
  const canonical = siteUrl ? `${siteUrl}/` : '';
  const tags: string[] = [];
  const meta = (attr: 'name' | 'property', key: string, content: string) => {
    if (content) tags.push(`<meta ${attr}="${key}" content="${escapeHtml(content)}" />`);
  };

  meta('name', 'theme-color', appearance.themeColor.dark);
  tags.push(buildThemeScript());
  tags.push(`<title>${escapeHtml(seo.title)}</title>`);
  meta('name', 'description', seo.description);
  meta('name', 'keywords', seo.keywords.join(', '));
  meta('name', 'author', personal.name);
  if (canonical) tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);

  meta('property', 'og:type', 'website');
  meta('property', 'og:site_name', personal.name);
  meta('property', 'og:title', seo.title);
  meta('property', 'og:description', seo.description);
  meta('property', 'og:locale', seo.locale);
  meta('property', 'og:url', canonical);
  meta('property', 'og:image', ogImage);
  if (ogImage) meta('property', 'og:image:alt', seo.title);

  meta('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
  meta('name', 'twitter:title', seo.title);
  meta('name', 'twitter:description', seo.description);
  meta('name', 'twitter:image', ogImage);
  meta('name', 'twitter:site', seo.twitterHandle);
  meta('name', 'twitter:creator', seo.twitterHandle);

  const current = experience.entries.find((entry) => !entry.endDate);
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.title,
    description: seo.description,
    knowsAbout: portfolio.skills.categories.flatMap((c) => c.skills.filter((s) => s.primary).map((s) => s.name)),
  };
  if (siteUrl) jsonLd.url = canonical;
  const sameAs = socials.map((s) => s.url).filter((url) => /^https?:\/\//i.test(url));
  if (sameAs.length) jsonLd.sameAs = sameAs;
  if (current) jsonLd.worksFor = { '@type': 'Organization', name: current.company };
  // Escape "<" so the JSON can never close the <script> element.
  tags.push(
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  );

  return tags.join('\n    ');
}

function buildRobots(siteUrl: string): string {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /api/'];
  if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  return `${lines.join('\n')}\n`;
}

function buildSitemap(siteUrl: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(siteUrl)}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export function seoPlugin(): Plugin {
  let siteUrl = '';
  return {
    name: 'portfolio-seo',
    configResolved() {
      siteUrl = resolveSiteUrl();
    },
    transformIndexHtml(html) {
      if (!html.includes(HEAD_PLACEHOLDER)) {
        throw new Error(`[portfolio-seo] index.html is missing the ${HEAD_PLACEHOLDER} placeholder.`);
      }
      return html.replace(HEAD_PLACEHOLDER, buildHeadTags(siteUrl));
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(siteUrl) });
      if (siteUrl) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(siteUrl) });
      } else {
        this.warn(
          'No site URL configured (seo.siteUrl / SITE_URL / VERCEL_PROJECT_PRODUCTION_URL) — ' +
            'canonical, og:url and sitemap.xml were skipped.',
        );
      }
    },
  };
}
