"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  STAGGER_CONTAINER,
  FADE_UP,
  EASE_MISSION,
} from "@/lib/motion";

/**
 * Home hero.
 *
 * Visual structure (back to front):
 *   1. Background <video> — Pexels stock footage, autoplay/muted/loop, slow zoom animation
 *   2. Gradient overlay — black-dominant, fades from full opacity at top/bottom to ~50% in the middle
 *   3. Foreground content — H1 (no animation, LCP element), subhead, accent line, CTA
 *
 * Performance & SEO:
 * - The H1 is server-rendered HTML and is NOT wrapped in motion. It's the LCP target.
 * - Animations only touch the subhead, accent line, and CTA — well below the LCP element.
 * - Video preloads metadata only; full data streams as the user lands.
 * - prefers-reduced-motion is respected: skips all entry animations and the slow zoom.
 *
 * Stock footage source:
 *   Pexels video #6253166 (Muay Thai training) — free for commercial use, no attribution required.
 *   Direct MP4 URL is hardcoded below; replace with a Cloudinary-hosted clip once gym footage exists.
 */
export function HomeHero({
  headline,
  subhead,
  ctaLabel,
  ctaHref,
}: {
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-mission-black">
      {/* Background video */}
      <m.video
        // Slow zoom adds living-image quality without distraction. Skipped under reduced motion.
        animate={reduce ? undefined : { scale: [1, 1.06] }}
        transition={
          reduce
            ? undefined
            : {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }
        }
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source
          src="https://videos.pexels.com/video-files/6253166/6253166-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </m.video>

      {/* Gradient overlay — keeps text legible regardless of video frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-mission-black/85 via-mission-black/50 to-mission-black/95"
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center">
        {/* H1 — LCP target. No motion wrapper. Rendered as plain HTML. */}
        <h1 className="text-balance text-mission-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
          {headline}
        </h1>

        {/* Below-LCP elements — animate in via stagger */}
        <m.div
          variants={reduce ? undefined : STAGGER_CONTAINER}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "visible"}
          className="mt-8 flex flex-col items-center gap-8"
        >
          {/* Red accent line */}
          <m.span
            variants={reduce ? undefined : FADE_UP}
            className="block h-1 w-24 bg-mission-red"
            aria-hidden="true"
          />

          {/* Subhead */}
          <m.p
            variants={reduce ? undefined : FADE_UP}
            className="max-w-2xl text-pretty text-lg text-mission-gray-300 md:text-xl"
          >
            {subhead}
          </m.p>

          {/* CTA */}
          <m.div variants={reduce ? undefined : FADE_UP}>
            <Link
              href={ctaHref}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-mission-red px-10 py-4 text-base font-bold uppercase tracking-wider text-mission-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black md:text-lg"
            >
              {ctaLabel}
            </Link>
          </m.div>
        </m.div>
      </div>

      {/* Scroll affordance — animated arrow at the bottom */}
      {!reduce && (
        <m.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.5, ease: EASE_MISSION },
            y: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1.5,
            },
          }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-mission-white/60"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" />
          </svg>
        </m.div>
      )}
    </section>
  );
}
