/**
 * Type definitions for every piece of portfolio content.
 * All UI components render from data typed here — see src/data/portfolio.ts.
 */

/** Keys of the icon registry in src/components/common/Icon.tsx. */
export type IconName =
  | 'server'
  | 'code'
  | 'smartphone'
  | 'layers'
  | 'wrench'
  | 'database'
  | 'plug'
  | 'shield'
  | 'git'
  | 'test'
  | 'rocket'
  | 'workflow'
  | 'braces'
  | 'layout'
  | 'monitor-smartphone'
  | 'cloud'
  | 'cpu'
  | 'dashboard'
  | 'globe'
  | 'briefcase';

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'opensource'
  | 'services'
  | 'testimonials'
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'website' | 'x';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Leave empty ('') to hide the link everywhere. */
  url: string;
}

export interface PersonalInfo {
  name: string;
  /** Short name / initials used in the nav logo. */
  shortName: string;
  title: string;
  location?: string;
  /** Short status line, e.g. "Open to opportunities". Leave empty to hide. */
  availability?: string;
}

export interface SectionHeader {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface HeroContent {
  greeting: string;
  headline: string;
  intro: string;
  ctas: {
    projects: string;
    resume: string;
    contact: string;
  };
  /** Technologies shown in the animated orbit. Inner ring gets the first `innerRingCount`. */
  orbit: string[];
  innerRingCount: number;
  /** Label in the centre of the orbit. */
  orbitCenterLabel: string;
}

export interface Highlight {
  icon: IconName;
  title: string;
  description: string;
}

export interface AboutContent extends SectionHeader {
  paragraphs: string[];
  highlights: Highlight[];
}

export interface Skill {
  name: string;
  /** Marks a primary, day-to-day technology. Not a proficiency score. */
  primary?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  skills: Skill[];
}

export interface SkillsContent extends SectionHeader {
  primaryLegend: string;
  categories: SkillCategory[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  employmentType?: string;
  location?: string;
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  /** ISO date, or omit for a current position. */
  endDate?: string;
  summary?: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ExperienceContent extends SectionHeader {
  entries: ExperienceEntry[];
}

export interface EducationEntry {
  id: string;
  /** e.g. "Master of Computer Applications (MCA)" */
  degree: string;
  /** Optional specialisation, e.g. "Computer Application" */
  field?: string;
  institution: string;
  institutionUrl?: string;
  /** Affiliating university, e.g. "Devi Ahilya Vishwavidyalaya (DAVV)" */
  affiliation?: string;
  location?: string;
  startYear: number;
  /** Omit while studying — shown as "Present". */
  endYear?: number;
  /** Square logo in /public (transparent PNG / WebP works best). */
  logo?: { src: string; alt: string };
  /** Optional bullets: grade, thesis, coursework, achievements. */
  highlights?: string[];
}

export interface EducationContent extends SectionHeader {
  /** The section (and its nav item) is hidden while empty. */
  entries: EducationEntry[];
}

export type ProjectCategory = 'backend' | 'fullstack' | 'web' | 'mobile';
export type ProjectFilterId = 'all' | ProjectCategory;

export interface ProjectImage {
  /** Path under /public (e.g. "/images/projects/jobx24.webp") or absolute URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectReview {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  /** Unique, URL-safe id. */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Human label such as "Mobile Application". */
  typeLabel: string;
  summary: string;
  description: string;
  features: string[];
  technologies: string[];
  /** Cover image used on the card and at the top of the details dialog. */
  image?: ProjectImage;
  /** Extra screenshots shown in the details dialog. */
  gallery?: ProjectImage[];
  /** Your role on the project, e.g. "Full Stack Developer". */
  role?: string;
  /** Company / agency the project was delivered with. */
  organization?: string;
  client?: string;
  industry?: string;
  clientLocation?: string;
  /** e.g. "16 weeks" */
  duration?: string;
  /** The problem the client needed solved. */
  challenge?: string;
  /** What was built. */
  solution?: string;
  /** Client feedback about the project (shown in the details dialog). */
  clientReview?: ProjectReview;
  /** Only real, public URLs. Leave undefined to hide the button. */
  githubUrl?: string;
  liveUrl?: string;
  /** Google Play / App Store listing URLs. */
  playStoreUrl?: string;
  appStoreUrl?: string;
  /** Optional clarifying note, e.g. "Source code is private". */
  note?: string;
}

export interface ProjectFilter {
  id: ProjectFilterId;
  label: string;
}

export interface ProjectsContent extends SectionHeader {
  filters: ProjectFilter[];
  emptyState: {
    title: string;
    description: string;
  };
  categoryLabels: Record<ProjectCategory, string>;
  items: Project[];
  /** Heading for the compact list of smaller projects. */
  additionalTitle?: string;
  /** Smaller projects shown as a compact list below the grid. Empty hides the list. */
  additional?: AdditionalProject[];
}

export interface AdditionalProject {
  title: string;
  description?: string;
  url?: string;
}

export interface Service {
  icon: IconName;
  title: string;
  description: string;
}

export interface ServicesContent extends SectionHeader {
  items: Service[];
}

export interface OpenSourceProject {
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  /** Package registry page (pub.dev, Maven Central, npm…). Omit if unpublished. */
  packageUrl?: string;
}

export interface OpenSourceContent extends SectionHeader {
  /** Link to the full profile, shown below the grid. Empty hides it. */
  profileUrl?: string;
  profileLabel?: string;
  /** The section (and its nav item) is hidden while empty. */
  items: OpenSourceProject[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  /** Link to a verifiable source (LinkedIn recommendation, etc.). */
  sourceUrl?: string;
}

export interface TestimonialsContent extends SectionHeader {
  /** Only add verified testimonials. The section is hidden while empty. */
  items: Testimonial[];
}

export interface ContactContent extends SectionHeader {
  /** Leave empty to hide. */
  email: string;
  /** Leave empty to hide. Use international format, e.g. "+91 98765 43210". */
  phone: string;
  /** Serverless endpoint that delivers form messages. */
  endpoint: string;
  successMessage: string;
  fallbackErrorMessage: string;
}

export interface ResumeConfig {
  /** "/resume.pdf" (file in /public) or an absolute URL. Empty string hides the button. */
  url: string;
  /** Suggested download file name. */
  fileName: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  /** Canonical production URL without trailing slash, e.g. "https://example.dev". */
  siteUrl: string;
  /** Path under /public or absolute URL. 1200×630 PNG/JPG recommended. Empty hides it. */
  ogImage: string;
  /** e.g. "@handle". Empty hides it. */
  twitterHandle: string;
  locale: string;
}

export type ThemeMode = 'light' | 'dark';

export interface AppearanceConfig {
  /** Theme used on a visitor's first visit. 'system' follows the OS setting. */
  defaultMode: ThemeMode | 'system';
  /** Show the light / dark toggle in the navbar. */
  showToggle: boolean;
  /** Browser UI colour (mobile address bar) for each theme. */
  themeColor: Record<ThemeMode, string>;
}

export interface FooterContent {
  tagline: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  navigation: NavItem[];
  socials: SocialLink[];
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  education: EducationContent;
  projects: ProjectsContent;
  services: ServicesContent;
  openSource: OpenSourceContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  resume: ResumeConfig;
  seo: SeoConfig;
  appearance: AppearanceConfig;
  footer: FooterContent;
}
