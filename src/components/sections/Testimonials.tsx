import { ExternalLink, Quote } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';

/** Rendered only when verified testimonials exist in the config (see App.tsx). */
export function Testimonials() {
  const { testimonials } = portfolio;
  if (!testimonials.items.length) return null;

  return (
    <Section id="testimonials" header={testimonials}>
      <ul className="grid gap-5 md:grid-cols-2">
        {testimonials.items.map((item, index) => (
          <Reveal as="li" key={item.author + index} delay={(index % 2) * 0.08}>
            <figure className="glass flex h-full flex-col rounded-2xl p-6 sm:p-8">
              <Quote className="mb-4 size-7 text-emerald-400/70" aria-hidden="true" />
              <blockquote className="flex-1 leading-relaxed text-slate-200">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-line-soft pt-5">
                <div>
                  <p className="font-semibold text-white">{item.author}</p>
                  <p className="text-sm text-slate-400">
                    {item.role}
                    {item.company && ` · ${item.company}`}
                  </p>
                </div>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source of ${item.author}'s testimonial`}
                    className="text-slate-400 transition-colors hover:text-emerald-300"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
