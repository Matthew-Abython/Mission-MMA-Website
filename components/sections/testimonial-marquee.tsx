"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Two-row infinite marquee. Row 1 scrolls left, Row 2 scrolls right.
 * Uses CSS @keyframes marquee-left / marquee-right (defined in globals.css)
 * rather than Framer Motion keyframe arrays so that animation-play-state:paused
 * works correctly on hover — Framer Motion WAAPI animations do not respond to
 * the CSS animation-play-state property.
 */

interface Testimonial {
  author: string;
  body: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    author: "Ricardo H.",
    body: "Mission MMA is a top-tier facility for serious martial arts training. The coaches care about each student's development, the culture is welcoming for beginners, and the BJJ instruction is excellent.",
  },
  {
    author: "Jackie V.",
    body: "Great gym with phenomenal instructors. I started with no background in martial arts and the women's BJJ class made it easy to begin. The community is supportive and the training is real.",
  },
  {
    author: "Kimmy P.",
    body: "Mission has been amazing for my Muay Thai journey. The coaches push you and the technique focus is real. I've grown as a fighter and as a person training here.",
  },
  {
    author: "Jae R.",
    body: "Best gym in the West Loop. The BJJ program is legitimate and the coaches actually teach — they don't just throw you on the mats. Worth every minute of the commute.",
  },
  {
    author: "Edirin I.",
    body: "Trained Muay Thai here for over a year. The instruction is authentic, the sparring is controlled, and the community is genuine. Cannot recommend enough.",
  },
  {
    author: "Jessica S.",
    body: "I love this gym. The women's BJJ class is exactly what I was looking for — real training in a comfortable environment. The coaches are knowledgeable and patient.",
  },
];

// Edge-fade mask applied to the overflow container
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="flex w-[300px] shrink-0 flex-col gap-4"
      style={{
        backgroundColor: "#1A1A1A",
        border: "1px solid rgba(200, 16, 46, 0.2)",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      {/* Five yellow stars */}
      <div aria-label="5 out of 5 stars">
        <span aria-hidden="true" className="text-base leading-none text-yellow-400">
          ★★★★★
        </span>
      </div>

      {/* Quote */}
      <blockquote
        className="italic leading-relaxed text-mission-white"
        style={{ fontSize: "15px" }}
      >
        &ldquo;{testimonial.body}&rdquo;
      </blockquote>

      {/* Reviewer name */}
      <footer
        className="font-display uppercase text-mission-red"
        style={{ fontSize: "14px", letterSpacing: "0.05em" }}
      >
        — {testimonial.author}
      </footer>
    </article>
  );
}

interface MarqueeRowProps {
  testimonials: Testimonial[];
  direction: "left" | "right";
  playState: "running" | "paused";
  reduced: boolean;
}

function MarqueeRow({ testimonials, direction, playState, reduced }: MarqueeRowProps) {
  return (
    <div
      className="flex will-change-transform"
      style={
        reduced
          ? undefined
          : {
              gap: "20px",
              animation: `marquee-${direction} 30s linear infinite`,
              animationPlayState: playState,
            }
      }
    >
      {testimonials.map((t, i) => (
        <TestimonialCard
          key={`${direction}-${i}`}
          testimonial={t}
        />
      ))}
    </div>
  );
}

export function TestimonialMarquee() {
  const reduced = useReducedMotion() ?? false;
  const [paused, setPaused] = useState(false);

  // Duplicate each row so -50% translate is a seamless loop
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

  const playState = paused ? "paused" : "running";

  return (
    <section className="bg-mission-black py-20 md:py-32">
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center">
        <div className="mx-auto mb-4 h-[3px] w-[48px] bg-mission-red" />
        <h2>What Our Members Say</h2>
        <p className="mt-4 text-mission-gray-300">
          Real reviews from our BJJ, Muay Thai, and MMA community.
        </p>
      </div>

      {/* Masked overflow container — hover here pauses both rows */}
      <div
        className="overflow-hidden"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Row 1 — left */}
        <MarqueeRow
          testimonials={row1}
          direction="left"
          playState={playState}
          reduced={reduced}
        />

        {/* Row 2 — right, reversed order for visual variety */}
        <div style={{ marginTop: "20px" }}>
          <MarqueeRow
            testimonials={row2}
            direction="right"
            playState={playState}
            reduced={reduced}
          />
        </div>
      </div>
    </section>
  );
}
