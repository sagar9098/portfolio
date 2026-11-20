# Developer Portfolio — Sagar Patel

A content-driven, responsive developer portfolio built with **React, TypeScript, Vite, Tailwind CSS and Framer Motion**, with a serverless contact form. It is ready to deploy on **Vercel**.

All content comes from one file, [`src/data/portfolio.ts`](src/data/portfolio.ts). You can add, edit or remove projects, skills, experience, services and links there without changing any components.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173 (frontend only)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

To test the contact form locally, run the site with the [Vercel CLI](https://vercel.com/docs/cli). It runs `/api` functions too:

```bash
npm i -g vercel
vercel link
vercel env pull .env.local   # or create .env.local from .env.example
vercel dev
```

Requires Node.js 20+.

---

## Editing content

Open `src/data/portfolio.ts`. Each block maps to one section of the page:

| Key            | Controls                                                                |
| -------------- | ----------------------------------------------------------------------- |
| `personal`     | Name, title, location, availability badge                               |
| `navigation`   | Nav items and their order                                               |
| `socials`      | GitHub, LinkedIn, etc. **An empty `url` hides the link everywhere.**    |
| `hero`         | Greeting, headline, intro, CTA labels, technologies in the orbit        |
| `about`        | Paragraphs and highlight cards                                          |
| `skills`       | Skill categories. `primary: true` marks core stack (not a proficiency score) |
| `experience`   | Timeline entries. Omit `endDate` for a current role ("Present")         |
| `education`    | Degrees with institution, years, location and logo (`public/images/education/`). Hidden while empty. |
| `projects`     | Filters, labels, empty state and project items                          |
| `services`     | Service cards                                                           |
| `testimonials` | **Verified** testimonials only. The section is hidden while empty.      |
| `contact`      | Email, phone, endpoint, success/error copy. Empty values are hidden.    |
| `resume`       | Resume URL and download file name                                       |
| `openSource`   | Open-source packages / repos. The section is hidden while empty.        |
| `seo`          | Title, description, keywords, site URL, OG image, Twitter handle        |
| `appearance`   | Default theme (`'system'`, `'dark'` or `'light'`), toggle on/off, browser theme colours |

Icons are referenced by name (e.g. `'server'`, `'smartphone'`). The available names are listed in `IconName` in [`src/types/portfolio.ts`](src/types/portfolio.ts) and mapped in [`src/components/common/Icon.tsx`](src/components/common/Icon.tsx).

### Adding a project

Append an object to `projects.items`:

```ts
{
  slug: 'order-service',             // unique id
  title: 'Order Service API',
  category: 'backend',               // 'backend' | 'fullstack' | 'web' | 'mobile'
  typeLabel: 'Backend Service',
  summary: 'One-line overview shown on the card.',
  description: 'Longer description shown in the details dialog.',
  features: ['JWT authentication', 'Paginated REST endpoints'],
  technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL'],
  image: { src: '/images/projects/order-service.webp', alt: 'API docs screenshot', width: 1200, height: 750 },
  githubUrl: 'https://github.com/<you>/<repo>',   // optional, only real URLs
  liveUrl: 'https://…',                           // optional
}
```

- **Images:** put screenshots in `public/images/projects/`. WebP at about 1200×750 works well. They are lazy-loaded. Without an `image`, the card shows a generated cover in the category's theme (never a fake screenshot).
- **Links:** the GitHub and Live Demo buttons only render when their URL is set.
- **Filters:** the counts update automatically. An empty category shows the configured empty state.

### Resume

Place your PDF at **`public/resume.pdf`**, or set `resume.url` to an absolute URL. The "Download Resume" button appears only after the site confirms the file exists. If the file is missing, the button stays hidden.

### Things to fill in before launch

- [ ] `socials` → GitHub and LinkedIn URLs
- [ ] `contact.email`, `contact.phone` (optional)
- [ ] `public/resume.pdf`
- [ ] `seo.siteUrl` (your production domain)
- [ ] `seo.ogImage`: a 1200×630 PNG/JPG in `public/` for link previews (optional)
- [ ] Review `skills` and remove anything you don't use regularly

---

## Contact form

`src/components/sections/ContactForm.tsx` → `POST /api/contact` ([`api/contact.ts`](api/contact.ts), a Vercel serverless function) → [Resend](https://resend.com) email API.

- **Client:** field validation, email validation, loading, success and error states, 15 s timeout.
- **Server:** re-validates all input, strips CR/LF from header fields, escapes HTML, enforces JSON content type and a 16 KB body limit, and checks the request's origin.
- **Spam protection:** a hidden honeypot field, a minimum fill time, and a best-effort rate limit per IP (5 requests per 10 min per instance). For stronger limits, add a [Vercel Firewall](https://vercel.com/docs/security/vercel-waf) rate-limit rule on `/api/contact`.
- **Secrets:** the API key exists only as a server-side environment variable. Nothing secret is bundled into the frontend.

### Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (see [`.env.example`](.env.example)):

| Variable             | Required | Description                                                                 |
| -------------------- | -------- | --------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Yes      | API key from resend.com                                                     |
| `CONTACT_TO_EMAIL`   | Yes      | Inbox that receives messages (comma-separate for several)                   |
| `CONTACT_FROM_EMAIL` | Yes      | Verified sender, e.g. `Portfolio <hello@your-domain.com>`. Use `onboarding@resend.dev` for testing |
| `ALLOWED_ORIGINS`    | No       | Comma-separated allowed origins. Defaults to the host serving the function  |
| `SITE_URL`           | No       | Build-time fallback for the canonical URL if `seo.siteUrl` is empty         |

If the variables are missing, the form shows a friendly "temporarily unavailable" message. It also shows your email address as a fallback, if `contact.email` is set.

> Never prefix secrets with `VITE_`. Vite exposes those to the browser.

---

## SEO

At build time, [`vite-plugin-seo.ts`](vite-plugin-seo.ts) reads `portfolio.ts` and does two things:

- It injects the `<title>`, meta description, keywords, canonical link, Open Graph tags, Twitter card tags and JSON-LD `Person` data into `index.html`. Crawlers and link previews see them without running JavaScript.
- It emits `robots.txt` and `sitemap.xml` into `dist/`.

The site URL comes from `seo.siteUrl`, then `SITE_URL`, then Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. When none is available, the canonical link, `og:url` and the sitemap are skipped, and the build prints a warning.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository. `.env*` files are git-ignored.
2. In Vercel, choose **Add New → Project** and import the repository. The Vite preset and the settings in `vercel.json` are detected automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Functions: `api/*.ts`
3. Add the environment variables listed above.
4. Deploy. After adding a custom domain, set `seo.siteUrl` to it and redeploy.

`vercel.json` also sets security headers and long-term caching for hashed assets. No SPA rewrite is needed because the site is a single page with in-page anchors.

---

## Project structure

```
api/
  contact.ts                 Serverless contact endpoint (Resend)
public/
  favicon.svg
  images/                    Project screenshots
  resume.pdf                 ← add your resume here
src/
  components/
    common/                  Button, Section, Reveal, TechBadge, Icon, SocialLinks, ResumeButton…
    layout/                  Navbar, MobileDrawer, Logo, Footer
    projects/                ProjectCard, ProjectFilter, ProjectThumbnail, ProjectLinks, ProjectDetailsModal (lazy)
    sections/                Hero, TechOrbit, About, Skills, Experience, Projects, Services, Testimonials, Contact
  data/portfolio.ts          ← all content
  hooks/                     useActiveSection, useDialog, useResourceAvailable, useScrolled
  types/portfolio.ts         Content type definitions
  utils/                     Validation, dates, scrolling, class names, motion features
  App.tsx, main.tsx, index.css
vite-plugin-seo.ts           Build-time SEO / robots / sitemap
vercel.json
```

## Light and dark mode

- The default comes from `appearance.defaultMode`. `'system'` follows the visitor's OS setting, and keeps following it live until they choose a theme themselves.
- The navbar toggle saves the visitor's choice in `localStorage` (`portfolio-theme`).
- A tiny inline script, injected by `vite-plugin-seo.ts`, applies the theme before first paint, so there's no flash of the wrong theme.
- Colours are themed in [`src/index.css`](src/index.css). Dark is the base palette. `[data-theme='light']` remaps Tailwind's colour variables (`white`, `slate-*`, `ink-*` and the accents), so components need no `light:` variants. To tune light mode, edit that one block.

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus styles, and `aria-current` on the active nav item.
- The mobile drawer and project dialog trap focus, close on <kbd>Esc</kbd> and restore focus afterwards.
- Respects `prefers-reduced-motion`, both for animations and for smooth scrolling.
- Framer Motion features load asynchronously (`LazyMotion`), and the project dialog is code-split.
- Images are lazy-loaded with explicit dimensions to avoid layout shift.
