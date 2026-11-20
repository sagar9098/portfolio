import { m, useReducedMotion } from 'framer-motion';
import { CodeXml } from 'lucide-react';

interface TechOrbitProps {
  items: string[];
  innerRingCount: number;
  centerLabel: string;
}

interface RingProps {
  items: string[];
  /** Ring radius as a percentage of the container's half-width. */
  radius: number;
  duration: number;
  reverse?: boolean;
}

function Ring({ items, radius, duration, reverse = false }: RingProps) {
  const reduceMotion = useReducedMotion();
  const turn = reverse ? -360 : 360;
  const spin = reduceMotion ? undefined : { rotate: turn };
  const counterSpin = reduceMotion ? undefined : { rotate: -turn };
  const transition = { duration, ease: 'linear' as const, repeat: Infinity };

  return (
    <>
      <div
        className="absolute rounded-full border border-dashed border-line"
        style={{ inset: `${50 - radius / 2}%` }}
        aria-hidden="true"
      />
      <m.div className="absolute inset-0" animate={spin} transition={transition}>
        {items.map((label, index) => {
          const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + (radius / 2) * Math.cos(angle);
          const top = 50 + (radius / 2) * Math.sin(angle);
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <m.span
                animate={counterSpin}
                transition={transition}
                className="glass block rounded-xl px-2.5 py-1.5 font-mono text-[11px] font-medium whitespace-nowrap text-slate-200 shadow-lg shadow-black/30 sm:px-3 sm:text-xs"
              >
                {label}
              </m.span>
            </div>
          );
        })}
      </m.div>
    </>
  );
}

/** Animated orbit of technologies around a central emblem. Purely decorative; list is exposed to screen readers. */
export function TechOrbit({ items, innerRingCount, centerLabel }: TechOrbitProps) {
  const inner = items.slice(0, innerRingCount);
  const outer = items.slice(innerRingCount);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-[30rem]">
      <p className="sr-only">Technologies: {items.join(', ')}</p>
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-[18%] rounded-full bg-emerald-500/10 blur-3xl" />
        {outer.length > 0 && <Ring items={outer} radius={88} duration={60} reverse />}
        {inner.length > 0 && <Ring items={inner} radius={58} duration={40} />}
        <div className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-ink-800 to-ink-900 shadow-2xl shadow-emerald-500/20 sm:size-28">
          <CodeXml className="size-8 text-emerald-300 sm:size-9" />
          <span className="mt-1 font-mono text-[10px] tracking-wider text-slate-400 uppercase">{centerLabel}</span>
        </div>
      </div>
    </div>
  );
}
