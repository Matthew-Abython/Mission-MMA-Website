"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STAGGER_CONTAINER, FADE_UP, EASE_MISSION } from "@/lib/motion";

// VIDEO UPGRADE PATH:
// When real gym footage is available, pass videoUrl="/hero.mp4" to this component.
// Place the video file in /public/hero.mp4 (max 15MB, H.264, no audio track).
// The CSS mesh/blob background will automatically be replaced by the video.
// Recommended: export at 1920×1080, 30fps, 8–12 second loop.
//
// IMAGE PATH:
// Pass imageUrl="/mission_gym_hero.jpg" for a still photo background.
// Priority: videoUrl > imageUrl > CSS mesh fallback.

interface HeroGeometricProps {
  videoUrl?: string;
  imageUrl?: string;
}

// Width-reveal variant for the decorative rule — used instead of FADE_UP
const RULE_VARIANTS = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 100,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_MISSION },
  },
};

export function HeroGeometric({ videoUrl, imageUrl }: HeroGeometricProps) {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const chevronOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerProps = reduced
    ? {}
    : {
        variants: STAGGER_CONTAINER,
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  const itemProps = reduced ? {} : { variants: FADE_UP };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-mission-black">

      {/* === BACKGROUND === */}

      {videoUrl ? (
        /* Case 1: Video background */
        <>
          {/* Orbiting mesh blobs — CSS keyframe, skipped for reduced-motion */}
          {!reduced && (
            <>
              <div
                aria-hidden="true"
                className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
                style={{
                  background: "radial-gradient(circle, #C8102E 0%, transparent 70%)",
                  filter: "blur(80px)",
                  opacity: 0.15,
                  animation: "orbit1 18s ease-in-out infinite",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
                style={{
                  background: "radial-gradient(circle, #1a0305 0%, transparent 70%)",
                  filter: "blur(100px)",
                  opacity: 0.15,
                  animation: "orbit2 25s ease-in-out infinite",
                }}
              />
            </>
          )}
          {/* Diagonal scanline texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />
          <video
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            style={{ opacity: 0.3 }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-mission-black/60" />
        </>
      ) : imageUrl ? (
        /* Case 2: Still photo background — no blobs, no scanline */
        <>
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
          {/* Layered darkening overlays for legibility over bright mat photo */}
          <div aria-hidden="true" className="absolute inset-0 z-[1] bg-black/55" />
          <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </>
      ) : (
        /* Case 3: CSS mesh gradient fallback */
        <>
          {/* Orbiting mesh blobs — CSS keyframe, skipped for reduced-motion */}
          {!reduced && (
            <>
              <div
                aria-hidden="true"
                className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
                style={{
                  background: "radial-gradient(circle, #C8102E 0%, transparent 70%)",
                  filter: "blur(80px)",
                  opacity: 0.15,
                  animation: "orbit1 18s ease-in-out infinite",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
                style={{
                  background: "radial-gradient(circle, #1a0305 0%, transparent 70%)",
                  filter: "blur(100px)",
                  opacity: 0.15,
                  animation: "orbit2 25s ease-in-out infinite",
                }}
              />
            </>
          )}
          {/* Diagonal scanline texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />
        </>
      )}

      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mission-red to-transparent"
      />

      {/* === FOREGROUND — staggered reveal === */}
      <m.div
        {...containerProps}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* 1. Animated red rule */}
        <m.div
          variants={reduced ? undefined : RULE_VARIANTS}
          className="h-[2px] bg-mission-red mb-6"
          style={reduced ? { width: 100 } : undefined}
        />

        {/* 2. Eyebrow */}
        <m.p
          {...itemProps}
          className="font-display text-mission-red mb-4 text-[11px] tracking-[0.25em]"
        >
          CHICAGO&apos;S PREMIER MARTIAL ARTS GYM
        </m.p>

        {/* 3. H1 — "MISSION." carries the red glow pulse */}
        <m.h1
          {...itemProps}
          className="font-display font-bold uppercase leading-none text-mission-white mb-6 text-[96px] lg:text-[140px]"
        >
          <span className="block">MISSION MMA &amp;</span>
          <span
            className="block"
            style={
              reduced
                ? undefined
                : { animation: "glow-pulse 3s ease-in-out infinite" }
            }
          >
            FITNESS
          </span>
        </m.h1>

        {/* 4. Subhead */}
        <m.p
          {...itemProps}
          className="font-sans text-mission-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Train BJJ, Muay Thai, MMA, and more at Chicago&apos;s West Loop
          martial arts gym. Beginner-friendly. All levels welcome. First class free.
        </m.p>

        {/* 5. CTAs */}
        <m.div
          {...itemProps}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/book"
            className="inline-block bg-mission-red hover:bg-mission-red-dark text-white font-display uppercase tracking-wider text-base px-10 py-4 rounded transition-colors duration-200"
          >
            Claim Your Free Class
          </Link>
          <Link
            href="/schedule"
            className="inline-block border border-white/30 hover:border-white text-mission-white font-display uppercase tracking-wider text-base px-10 py-4 rounded transition-colors duration-200"
          >
            View Schedule
          </Link>
        </m.div>
      </m.div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mission-black to-transparent"
      />

      {/* === SCROLL INDICATOR === */}
      <m.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: chevronOpacity }}
      >
        <ChevronDown
          className="w-6 h-6 text-mission-gray-300"
          style={
            reduced
              ? undefined
              : { animation: "chevron-bounce 1.5s ease-in-out infinite" }
          }
        />
      </m.div>
    </section>
  );
}
