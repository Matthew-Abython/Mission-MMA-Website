"use client";

import { useRef } from "react";
import { m, useReducedMotion, useInView } from "framer-motion";
import { Award, Users, ShieldCheck, Heart } from "lucide-react";
import { STAGGER_FAST, EASE_MISSION } from "@/lib/motion";

const FEATURES = [
  {
    Icon: Award,
    title: "Expert Coaching",
    body: "Coaches with verifiable lineage and competition experience teach every class — not template instruction.",
  },
  {
    Icon: Users,
    title: "All Levels Welcome",
    body: "Beginners through experienced grapplers and strikers train side by side. No experience required.",
  },
  {
    Icon: ShieldCheck,
    title: "Women-Only Classes",
    body: "Dedicated women's Brazilian Jiu-Jitsu program plus a women's-only open mat — rare in Chicago.",
  },
  {
    Icon: Heart,
    title: "Kids Programs",
    body: "Separate Kids Muay Thai and Kids Brazilian Jiu-Jitsu — taught as real martial arts, not babysitting.",
  },
] as const;

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_MISSION } },
};

export function WhyTrainHere() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <section className="bg-mission-gray-900 px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Plain HTML — server-rendered. No motion wrapper (LCP/SEO rule). */}
        <h2>Why Train at Mission</h2>
        <p className="mb-12 mt-4 text-mission-gray-300 md:mb-16">
          Four reasons serious students choose Mission MMA &amp; Fitness for
          Brazilian Jiu-Jitsu, Muay Thai, and MMA in Chicago.
        </p>

        <m.div
          ref={ref}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={reduced ? undefined : STAGGER_FAST}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : isInView ? "visible" : "hidden"}
        >
          {FEATURES.map((feature) => (
            <m.div
              key={feature.title}
              variants={reduced ? undefined : CARD_VARIANTS}
              className="flex flex-col items-start gap-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-mission-red/10 text-mission-red">
                <feature.Icon
                  className="h-7 w-7"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-xl uppercase leading-tight text-mission-white md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-mission-gray-300">{feature.body}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
