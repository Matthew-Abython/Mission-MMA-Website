"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { EASE_MISSION } from "@/lib/motion";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface ClassPageHeroProps {
  /** Discipline name — rendered at Oswald 80px all-caps, -3px letter-spacing */
  title: string;
  /** Short descriptor below the title */
  subtitle?: string;
  /** URL of the hero image (must be in next.config.ts remotePatterns or /public/) */
  imageSrc: string;
  /** Alt text for the image; defaults to title if omitted */
  imageAlt?: string;
  /** Trail of links before the current page */
  breadcrumbs?: Breadcrumb[];
  /** CTA button label. Default: "Book Free Trial" */
  ctaText?: string;
  /** CTA button destination. Default: "/book" */
  ctaHref?: string;
}

export function ClassPageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  breadcrumbs,
  ctaText = "Book Free Trial",
  ctaHref = "/book",
}: ClassPageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  /**
   * Track the hero as it exits the viewport from the top.
   * "start start" = hero top reaches viewport top → progress 0
   * "end start"   = hero bottom reaches viewport top → progress 1
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /**
   * Three-layer parallax — all shift downward relative to the section as it
   * scrolls up, at different rates. Slower rate = appears to recede further
   * into the background = stronger depth illusion.
   *
   * Image wrapper starts at top:-80px so the +80px shift never exposes the
   * section's background color at the top edge.
   */
  const yImage    = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yGradient = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yText     = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-mission-black"
    >
      {/* ── Left vertical red accent bar ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-30 h-full w-[4px] bg-mission-red"
      />

      {/* ── Top-left triangle geometric shape ───────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-[200px] w-[200px]"
        style={{
          background: "var(--mission-red)",
          opacity: 0.08,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      {/* ── Layer 1: Background image — slowest parallax (+80px) ─────── */}
      <m.div
        aria-hidden="true"
        className="absolute left-0 right-0 h-[130%]"
        style={{ top: "-80px", y: reduced ? 0 : yImage }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </m.div>

      {/* ── Layer 2: Red-tinted gradient overlay — medium parallax (+40px) */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30"
        style={{ y: reduced ? 0 : yGradient }}
      />
      {/* Secondary diagonal red tint for cinematic depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-mission-red/10 via-transparent to-transparent"
      />

      {/* ── Layer 3: Text content — fastest / barely moves (+20px) ───── */}
      <m.div
        className="relative z-20 mx-auto flex h-full max-w-5xl flex-col items-start justify-center px-8 md:px-12"
        style={{ y: reduced ? 0 : yText }}
      >
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight
                      className="h-3 w-3 text-mission-gray-500"
                      aria-hidden="true"
                    />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-sm text-mission-gray-300 transition-colors hover:text-mission-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-mission-red">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Discipline name — Oswald 80px, -3px letter-spacing */}
        <h1
          className="font-display font-bold uppercase text-mission-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]"
          style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mission-gray-300">
            {subtitle}
          </p>
        )}

        {/* CTA with arrow icon */}
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-mission-red px-8 py-3.5 font-display text-base font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black"
          style={{ transition: `all 0.3s cubic-bezier(${EASE_MISSION.join(",")})` }}
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </m.div>
    </section>
  );
}
