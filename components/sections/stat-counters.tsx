"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ParallaxText } from "@/components/motion/parallax-text";
import { STAGGER_FAST, EASE_MISSION } from "@/lib/motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  /** Optional decoration rendered below the number — e.g. yellow stars */
  decoration?: string;
}

const STATS: Stat[] = [
  { value: 30,  suffix: "+", label: "Weekly Classes" },
  { value: 100, suffix: "+", label: "5-Star Reviews", decoration: "★★★★★" },
  { value: 7,               label: "Disciplines" },
  { value: 10,  suffix: "+", label: "Years Experience" },
];

// Card entrance: fade-up triggered by stagger container
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_MISSION },
  },
};

// Red bottom border: scaleX expands from center after the number appears.
// Delay of 0.4s is relative to when this element receives the "visible" trigger
// (which itself is staggered by the grid container), so borders trail their numbers.
const BORDER_VARIANTS = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.4, ease: EASE_MISSION },
  },
};

export function StatCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-[#111111] py-20 md:py-32">

      {/* SVG fractal-noise texture — 2% opacity for subtle grain */}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.02 }}
      >
        <filter id="stat-section-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#stat-section-noise)" />
      </svg>

      {/* ParallaxText watermark — scrolls behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
      >
        <ParallaxText
          text="MISSION MMA"
          speed={3}
          direction="left"
          color="white"
          opacity={0.04}
        />
      </div>

      {/* Stat grid — z-10 keeps it above the watermark */}
      <m.div
        ref={ref}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-14 px-4 md:grid-cols-4 md:gap-x-12 md:px-8"
        variants={reduced ? undefined : STAGGER_FAST}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : isInView ? "visible" : "hidden"}
      >
        {STATS.map((stat) => (
          <m.div
            key={stat.label}
            variants={reduced ? undefined : CARD_VARIANTS}
            className="relative flex flex-col pb-5"
          >
            {/* Large number + red suffix */}
            <div className="flex items-end leading-none">
              <span
                className="font-display font-bold text-mission-white"
                style={{ fontSize: "80px", lineHeight: 1 }}
              >
                <AnimatedCounter to={stat.value} noFormat />
              </span>
              {stat.suffix && (
                <span
                  className="font-display font-bold text-mission-red"
                  style={{ fontSize: "80px", lineHeight: 1 }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>

            {/* Yellow star decoration (reviews stat only) */}
            {stat.decoration && (
              <span
                className="mt-1 text-yellow-400"
                style={{ fontSize: "14px", letterSpacing: "3px" }}
              >
                {stat.decoration}
              </span>
            )}

            {/* Label */}
            <p
              className="mt-3 font-sans text-mission-gray-300"
              style={{ fontSize: "16px" }}
            >
              {stat.label}
            </p>

            {/* Red bottom border — scaleX 0 → 1, expands from center */}
            <m.div
              className="absolute bottom-0 left-0 h-[2px] w-full origin-center bg-mission-red"
              variants={reduced ? undefined : BORDER_VARIANTS}
            />
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
