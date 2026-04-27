"use client";

import { m, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  author: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

const TESTIMONIALS: Testimonial[] = [
  {
    author: "Ricardo H.",
    rating: 5,
    body: "Mission MMA is a top-tier facility for serious martial arts training. The coaches care about each student's development, the gym culture is welcoming for beginners, and the BJJ instruction is excellent. Highly recommended for anyone looking to start or continue their martial arts journey.",
  },
  {
    author: "Jackie V.",
    rating: 5,
    body: "Great gym with phenomenal instructors. I started with no background in martial arts and the women's BJJ class made it easy to begin. The community is supportive and the training is real — not watered down at all.",
  },
  {
    author: "Kimmy P.",
    rating: 5,
    body: "Mission has been amazing for my Muay Thai journey. The coaches push you and the technique focus is real. I've grown as a fighter and as a person training here.",
  },
  {
    author: "Jae R.",
    rating: 5,
    body: "Best gym in the West Loop. The BJJ program is legitimate and the coaches actually teach — they don't just throw you on the mats. Worth every minute of the commute.",
  },
  {
    author: "Edirin I.",
    rating: 5,
    body: "Trained Muay Thai here for over a year. The instruction is authentic, the sparring is controlled, and the community is genuine. Cannot recommend enough.",
  },
  {
    author: "Jessica S.",
    rating: 5,
    body: "I love this gym. The women's BJJ class is exactly what I was looking for — real training in a comfortable environment. The coaches are knowledgeable and patient.",
  },
];

export function TestimonialMarquee() {
  const reduced = useReducedMotion();
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden bg-mission-gray-900 px-4 py-20 md:py-32">
      {/* Edge fade masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-mission-gray-900 to-transparent md:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-mission-gray-900 to-transparent md:w-32"
      />

      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2>What Members Say</h2>
          <p className="mt-4 text-mission-gray-300">
            Real reviews from training partners across our BJJ, Muay Thai, and
            MMA programs.
          </p>
        </div>

        <div className="mt-12" aria-label="Testimonials carousel">
          <m.div
            className="flex gap-6 will-change-transform"
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={
              reduced
                ? undefined
                : {
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                  }
            }
          >
            {items.map((t, i) => (
              <TestimonialCard
                key={`${t.author}-${i}`}
                testimonial={t}
                aria-hidden={i >= TESTIMONIALS.length ? true : undefined}
              />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  ...rest
}: {
  testimonial: Testimonial;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <article
      {...rest}
      className="flex w-[320px] shrink-0 flex-col gap-4 rounded-lg border border-white/10 bg-mission-black/60 p-6 md:w-[400px]"
    >
      <div
        className="flex gap-1"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-mission-red text-mission-red"
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="leading-relaxed text-mission-gray-300">
        &ldquo;{testimonial.body}&rdquo;
      </blockquote>
      <footer className="font-display text-sm uppercase tracking-wider text-mission-white">
        {testimonial.author}
      </footer>
    </article>
  );
}
