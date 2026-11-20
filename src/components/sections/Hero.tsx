import { m } from 'framer-motion';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { ButtonLink } from '../common/Button';
import { ResumeButton } from '../common/ResumeButton';
import { SocialLinks } from '../common/SocialLinks';
import { TechOrbit } from './TechOrbit';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { personal, hero, socials } = portfolio;

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 -left-32 size-[36rem] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-8">
        <m.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          {personal.availability && (
            <m.p
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-emerald-200"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {personal.availability}
            </m.p>
          )}

          <m.p variants={item} className="font-mono text-sm text-slate-400">
            {hero.greeting}
          </m.p>
          <m.h1
            variants={item}
            className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">{personal.name}</span>
          </m.h1>
          <m.p variants={item} className="mt-4 text-base font-medium text-slate-200 sm:text-lg">
            {personal.title}
          </m.p>

          <m.p
            variants={item}
            className="mt-6 text-xl leading-snug font-semibold text-slate-100 sm:text-2xl lg:text-[1.7rem]"
          >
            {hero.headline}
          </m.p>
          <m.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
            {hero.intro}
          </m.p>

          {personal.location && (
            <m.p variants={item} className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="size-4 text-emerald-400" aria-hidden="true" />
              {personal.location}
            </m.p>
          )}

          <m.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" size="lg">
              {hero.ctas.projects}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ResumeButton label={hero.ctas.resume} />
            <ButtonLink href="#contact" variant="ghost" size="md" className="h-12 text-base">
              <Mail className="size-4" aria-hidden="true" />
              {hero.ctas.contact}
            </ButtonLink>
          </m.div>

          <m.div variants={item} className="mt-8">
            <SocialLinks links={socials} />
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechOrbit items={hero.orbit} innerRingCount={hero.innerRingCount} centerLabel={hero.orbitCenterLabel} />
        </m.div>
      </div>
    </section>
  );
}
