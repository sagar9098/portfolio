import { LazyMotion, MotionConfig } from 'framer-motion';
import type { SectionId } from './types/portfolio';
import { portfolio } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { OpenSource } from './components/sections/OpenSource';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Testimonials } from './components/sections/Testimonials';

/** Which sections have content to show. Sections without content are skipped and removed from the nav. */
const ENABLED: Record<SectionId, boolean> = {
  home: true,
  about: portfolio.about.paragraphs.length > 0,
  skills: portfolio.skills.categories.length > 0,
  experience: portfolio.experience.entries.length > 0,
  education: portfolio.education.entries.length > 0,
  projects: true,
  opensource: portfolio.openSource.items.length > 0,
  services: portfolio.services.items.length > 0,
  testimonials: portfolio.testimonials.items.length > 0,
  contact: true,
};

const loadMotionFeatures = () => import('./utils/motionFeatures').then((mod) => mod.default);

const navItems = portfolio.navigation.filter((item) => ENABLED[item.id]);
const observedSections = ['home', ...navItems.map((item) => item.id)];

export default function App() {
  const activeId = useActiveSection(observedSections);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-ink-950 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar items={navItems} activeId={activeId} />
        <main id="main" tabIndex={-1} className="overflow-x-clip focus:outline-none">
          <Hero />
          {ENABLED.about && <About />}
          {ENABLED.skills && <Skills />}
          {ENABLED.experience && <Experience />}
          {ENABLED.education && <Education />}
          <Projects />
          {ENABLED.opensource && <OpenSource />}
          {ENABLED.services && <Services />}
          {ENABLED.testimonials && <Testimonials />}
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
