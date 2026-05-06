"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

/**
 * Two-row infinite marquee. Row 1 scrolls left, Row 2 scrolls right.
 * Uses CSS @keyframes marquee-left / marquee-right (defined in globals.css)
 * rather than Framer Motion keyframe arrays so that animation-play-state:paused
 * works correctly on hover — Framer Motion WAAPI animations do not respond to
 * the CSS animation-play-state property.
 */

const DISCIPLINE_COLORS: Record<Testimonial["discipline"], string> = {
  "muay-thai": "#7a1218",
  bjj:         "#1a3a5c",
  kids:        "#1a4a2a",
  womens:      "#4a1a3a",
  events:      "#3d3d3d",
  general:     "#3d3d3d",
};

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
      {/* Avatar initials circle */}
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: DISCIPLINE_COLORS[testimonial.discipline] }}
      >
        {testimonial.initials}
      </div>

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
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Reviewer name */}
      <footer
        className="font-display uppercase text-mission-red"
        style={{ fontSize: "14px", letterSpacing: "0.05em" }}
      >
        — {testimonial.name}
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

  // Row 1: first 6 items, duplicated for seamless loop
  const row1 = [...TESTIMONIALS.slice(0, 6), ...TESTIMONIALS.slice(0, 6)];
  // Row 2: last 6 items, duplicated for seamless loop
  const row2 = [...TESTIMONIALS.slice(6), ...TESTIMONIALS.slice(6)];

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

        {/* Row 2 — right */}
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
