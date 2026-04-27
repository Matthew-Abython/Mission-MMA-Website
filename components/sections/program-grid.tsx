"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion, useInView } from "framer-motion";
import { STAGGER_FAST, EASE_MISSION } from "@/lib/motion";

const PROGRAMS = [
  {
    slug: "brazilian-jiu-jitsu",
    title: "Brazilian Jiu-Jitsu",
    aka: "BJJ · Jiu Jitsu",
    description: "Gi and No-Gi grappling for all levels.",
    image:
      "https://images.pexels.com/photos/8990063/pexels-photo-8990063.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "muay-thai",
    title: "Muay Thai",
    aka: "Thai Boxing",
    description: "Authentic Thai-style striking — fists, elbows, knees, shins.",
    image:
      "https://images.pexels.com/photos/4754149/pexels-photo-4754149.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "mma",
    title: "MMA",
    aka: "Mixed Martial Arts",
    description: "Striking, grappling, and full-rules training under one roof.",
    image:
      "https://images.pexels.com/photos/9012462/pexels-photo-9012462.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "womens-bjj",
    title: "Women's BJJ",
    aka: "Women's Jiu-Jitsu",
    description: "Dedicated women's-only classes plus a women's open mat.",
    image:
      "https://images.pexels.com/photos/7991578/pexels-photo-7991578.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "kids",
    title: "Kids Martial Arts",
    aka: "Muay Thai & BJJ",
    description: "Separate kids Muay Thai and Brazilian Jiu-Jitsu programs.",
    image:
      "https://images.pexels.com/photos/8612976/pexels-photo-8612976.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "open-mat",
    title: "Open Mat",
    aka: "BJJ Open Rolling",
    description: "Friday adult open mat plus Saturday women's open mat.",
    image:
      "https://images.pexels.com/photos/6253307/pexels-photo-6253307.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "strength-conditioning",
    title: "Strength & Conditioning",
    aka: "Built for Martial Artists",
    description:
      "Functional fitness designed to support BJJ, Muay Thai, and MMA.",
    image:
      "https://images.pexels.com/photos/6253310/pexels-photo-6253310.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
] as const;

// Named variant propagation: parent "hover" state cascades to IMAGE_VARIANTS children
const TILE_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_MISSION },
  },
  hover: { y: -4, transition: { duration: 0.4, ease: EASE_MISSION } },
};

const IMAGE_VARIANTS = {
  hidden: { scale: 1 },
  visible: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.4, ease: EASE_MISSION } },
};

function tileSpan(slug: string): string {
  if (slug === "brazilian-jiu-jitsu") return "md:col-span-2 md:row-span-2";
  if (slug === "open-mat") return "md:col-span-2 md:row-span-1";
  if (slug === "strength-conditioning") return "md:col-span-2 md:row-span-1";
  return "md:col-span-1 md:row-span-1";
}

export function ProgramGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <section
      id="programs"
      className="bg-mission-black px-4 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Plain HTML — server-rendered, not wrapped in motion (LCP/SEO rule) */}
        <h2>Train Like You Mean It</h2>
        <p className="mb-10 mt-4 text-mission-gray-300 md:mb-16">
          Seven programs. Real instruction. Find yours.
        </p>

        <m.div
          ref={ref}
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
          variants={reduced ? undefined : STAGGER_FAST}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : isInView ? "visible" : "hidden"}
        >
          {PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={`/classes/${p.slug}`}
              className={tileSpan(p.slug)}
            >
              <m.article
                className="relative min-h-[240px] cursor-pointer overflow-hidden rounded-lg h-60 md:h-full"
                variants={reduced ? undefined : TILE_VARIANTS}
                whileHover={reduced ? undefined : "hover"}
              >
                {/* Image wrapper — responds to parent "hover" variant */}
                <m.div
                  className="absolute inset-0"
                  variants={reduced ? undefined : IMAGE_VARIANTS}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                </m.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Text content — pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="font-display uppercase leading-tight text-white text-lg md:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-mission-red">{p.aka}</p>
                  <p className="mt-1 text-sm text-mission-gray-300">
                    {p.description}
                  </p>
                </div>
              </m.article>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
}
