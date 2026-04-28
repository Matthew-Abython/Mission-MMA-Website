"use client";

import { useReducedMotion } from "framer-motion";
import { m } from "framer-motion";
import { EASE_MISSION } from "@/lib/motion";
import Link from "next/link";

interface ShapeProps {
  className: string;
  delay?: number;
  reduced: boolean;
}

function ElegantShape({ className, delay = 0, reduced }: ShapeProps) {
  if (reduced) {
    return (
      <div className={`absolute rounded-full border border-white/[0.08] bg-white/[0.02] ${className}`} />
    );
  }
  return (
    <m.div
      className={`absolute rounded-full border border-white/[0.08] bg-white/[0.02] ${className}`}
      initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay, ease: EASE_MISSION }}
    />
  );
}

interface HeroGeometricProps {
  badge?: string;
  title1?: string;
  title2?: string;
}

export function HeroGeometric({
  badge = "Chicago's Premier Martial Arts Gym",
  title1 = "Chicago's Premier",
  title2 = "BJJ & Muay Thai Gym",
}: HeroGeometricProps) {
  const reduced = useReducedMotion() ?? false;

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: EASE_MISSION },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mission-black">
      <div className="absolute inset-0 bg-gradient-to-br from-mission-red/[0.07] via-transparent to-transparent" />

      <ElegantShape reduced={reduced} delay={0.1} className="w-[600px] h-[600px] -top-40 -right-32 opacity-30" />
      <ElegantShape reduced={reduced} delay={0.2} className="w-[400px] h-[400px] -bottom-20 -left-20 opacity-20" />
      <ElegantShape reduced={reduced} delay={0.15} className="w-[280px] h-[280px] top-1/3 -left-10 opacity-15" />
      <ElegantShape reduced={reduced} delay={0.25} className="w-[200px] h-[200px] bottom-1/4 right-1/4 opacity-10" />

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mission-red to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {reduced ? (
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-mission-red/30 bg-mission-red/10 text-mission-red text-sm font-medium uppercase tracking-widest">
            {badge}
          </div>
        ) : (
          <m.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-mission-red/30 bg-mission-red/10 text-mission-red text-sm font-medium uppercase tracking-widest"
          >
            {badge}
          </m.div>
        )}

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-mission-white leading-none mb-4">
          {reduced ? (
            <>
              <span className="block">{title1}</span>
              <span className="block text-mission-red">{title2}</span>
            </>
          ) : (
            <>
              <m.span custom={1} variants={textVariants} initial="hidden" animate="visible" className="block">
                {title1}
              </m.span>
              <m.span custom={2} variants={textVariants} initial="hidden" animate="visible" className="block text-mission-red">
                {title2}
              </m.span>
            </>
          )}
        </h1>

        {reduced ? (
          <p className="text-mission-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Train BJJ, Muay Thai, MMA, and more at Chicago&apos;s West Loop martial arts gym. Beginner-friendly. All levels welcome. First class free.
          </p>
        ) : (
          <m.p custom={3} variants={textVariants} initial="hidden" animate="visible" className="text-mission-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Train BJJ, Muay Thai, MMA, and more at Chicago&apos;s West Loop martial arts gym. Beginner-friendly. All levels welcome. First class free.
          </m.p>
        )}

        {reduced ? (
          <Link href="/free-trial" className="inline-block bg-mission-red hover:bg-mission-red-dark text-white font-display uppercase tracking-wider text-lg px-10 py-4 rounded transition-colors duration-200">
            Claim Your Free Class
          </Link>
        ) : (
          <m.div custom={4} variants={textVariants} initial="hidden" animate="visible">
            <Link href="/free-trial" className="inline-block bg-mission-red hover:bg-mission-red-dark text-white font-display uppercase tracking-wider text-lg px-10 py-4 rounded transition-colors duration-200">
              Claim Your Free Class
            </Link>
          </m.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mission-black to-transparent" />
    </section>
  );
}
