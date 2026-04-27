"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EASE_MISSION } from "@/lib/motion";

export function ClassPageHero({
  image,
  imageAlt,
  title,
  dek,
  ctaLabel,
  ctaHref,
}: {
  image: string;
  imageAlt: string;
  title: string;
  dek: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduced ? "0%" : "30%"]
  );

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-mission-black"
    >
      <m.div
        style={{ y }}
        className="absolute inset-0 h-[130%]"
        aria-hidden="true"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </m.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-mission-black/70 via-mission-black/40 to-mission-black/95"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-start justify-center px-4 md:px-8">
        <h1 className="text-balance text-mission-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-mission-gray-300 md:text-xl">
          {dek}
        </p>
        <div className="mt-8">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-mission-red px-8 py-3.5 text-base font-bold uppercase tracking-wider text-mission-white transition-all duration-300 hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black md:text-lg"
            style={{
              transition: `all 0.3s cubic-bezier(${EASE_MISSION.join(",")})`,
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
