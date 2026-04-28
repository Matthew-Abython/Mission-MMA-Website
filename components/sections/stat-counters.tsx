"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import {
  totalWeeklyClasses,
  classesByDiscipline,
  BJJ_DISCIPLINES,
  MUAY_THAI_DISCIPLINES,
} from "@/lib/schedule";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { STAGGER_FAST, EASE_MISSION } from "@/lib/motion";

const STATS = [
  {
    value: totalWeeklyClasses(),
    label: "Weekly Classes",
    suffix: "",
    description: "Across BJJ, Muay Thai, MMA, and more",
  },
  {
    value: classesByDiscipline(BJJ_DISCIPLINES).length,
    label: "BJJ Classes",
    suffix: "",
    description: "Gi and No-Gi taught every week",
  },
  {
    value: classesByDiscipline(MUAY_THAI_DISCIPLINES).length,
    label: "Muay Thai Classes",
    suffix: "",
    description: "Including a dedicated sparring class",
  },
  {
    value: 2014,
    label: "Training Since",
    suffix: "",
    description: "Serving Chicago's West Loop community",
    noFormat: true,
  },
];

const STAT_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_MISSION },
  },
};

export function StatCounters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <section className="border-y border-white/5 bg-mission-black px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <m.div
          ref={ref}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
          variants={reduced ? undefined : STAGGER_FAST}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : isInView ? "visible" : "hidden"}
        >
          {STATS.map((stat) => (
            <m.div
              key={stat.label}
              variants={reduced ? undefined : STAT_VARIANTS}
              className="flex flex-col items-start"
            >
              <div className="font-display text-5xl font-bold leading-none text-mission-red md:text-6xl lg:text-7xl">
                <AnimatedCounter to={stat.value} noFormat={stat.noFormat} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className="mt-3 font-display text-base uppercase text-mission-white md:text-lg">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-mission-gray-300">
                {stat.description}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
