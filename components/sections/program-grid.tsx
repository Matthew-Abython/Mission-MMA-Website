"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion, useInView } from "framer-motion";
import { EASE_MISSION } from "@/lib/motion";

type Slug =
  | "brazilian-jiu-jitsu"
  | "muay-thai"
  | "mma"
  | "womens-bjj"
  | "kids"
  | "open-mat"
  | "strength-conditioning";

interface Program {
  slug: Slug;
  badge: string;
  title: string;
  description: string;
  defaultImage: string;
  featured: boolean;
}

const PROGRAMS: Program[] = [
  {
    slug: "brazilian-jiu-jitsu",
    badge: "BJJ",
    title: "Brazilian Jiu-Jitsu",
    description: "Gi and No-Gi grappling for every level.",
    defaultImage:
      "https://images.pexels.com/photos/6253310/pexels-photo-6253310.jpeg?auto=compress&cs=tinysrgb&w=1200",
    featured: true,
  },
  {
    slug: "muay-thai",
    badge: "Muay Thai",
    title: "Muay Thai",
    description: "Authentic striking — fists, elbows, knees, and shins.",
    defaultImage: "/Kickboxing_2.jpg",
    featured: true,
  },
  {
    slug: "mma",
    badge: "MMA",
    title: "Mixed Martial Arts",
    description: "Striking and grappling combined under one roof.",
    defaultImage:
      "https://images.pexels.com/photos/6295922/pexels-photo-6295922.jpeg?auto=compress&cs=tinysrgb&w=1200",
    featured: false,
  },
  {
    slug: "womens-bjj",
    badge: "Women's BJJ",
    title: "Women's BJJ",
    description: "Dedicated women's-only classes and open mat.",
    defaultImage:
      "https://images.pexels.com/photos/7045398/pexels-photo-7045398.jpeg?auto=compress&cs=tinysrgb&w=1200",
    featured: false,
  },
  {
    slug: "kids",
    badge: "Kids",
    title: "Kids Martial Arts",
    description: "Separate Muay Thai and BJJ programs for children.",
    defaultImage:
      "https://images.pexels.com/photos/8764846/pexels-photo-8764846.jpeg?auto=compress&cs=tinysrgb&w=1200",
    featured: false,
  },
  {
    slug: "open-mat",
    badge: "Open Mat",
    title: "Open Mat",
    description: "Friday adult and Saturday women's open rolling.",
    defaultImage:
      "https://images.pexels.com/photos/6253307/pexels-photo-6253307.jpeg?auto=compress&cs=tinysrgb&w=1200",
    featured: false,
  },
  {
    slug: "strength-conditioning",
    badge: "S&C",
    title: "Strength & Conditioning",
    description: "Functional fitness built for martial artists.",
    defaultImage:
      "https://images.pexels.com/photos/4384679/pexels-photo-4384679.jpeg?auto=compress&cs=tinysrgb&w=1200",
    featured: false,
  },
];

// Card entrance — custom fn receives index for per-card stagger delay
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_MISSION, delay: i * 0.08 },
  }),
  // whileHover="cardHover" on the article propagates this state to children with matching variants
  cardHover: {
    scale: 1.025,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

// Image wrapper — responds to "cardHover" propagated from parent article
const IMAGE_VARIANTS = {
  hidden: { scale: 1 },
  visible: { scale: 1, transition: { duration: 0.4, ease: EASE_MISSION } },
  cardHover: {
    scale: 1.08,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export interface ProgramGridProps {
  images?: Partial<Record<Slug, string>>;
}

function ProgramCard({
  program,
  index,
  imageUrl,
  isInView,
  reduced,
  featured,
}: {
  program: Program;
  index: number;
  imageUrl: string | undefined;
  isInView: boolean;
  reduced: boolean;
  featured: boolean;
}) {
  const src = imageUrl ?? program.defaultImage;

  return (
    <Link href={`/classes/${program.slug}`} className="block">
      <m.article
        className={`group relative overflow-hidden rounded-lg cursor-pointer ${
          featured ? "aspect-video" : "aspect-[4/3]"
        }`}
        variants={reduced ? undefined : CARD_VARIANTS}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : isInView ? "visible" : "hidden"}
        custom={index}
        whileHover={reduced ? undefined : "cardHover"}
      >
        {/* Image — separate m.div so it can zoom independently on cardHover */}
        <m.div
          className="absolute inset-0 overflow-hidden"
          variants={reduced ? undefined : IMAGE_VARIANTS}
        >
          <Image
            src={src}
            alt={program.title}
            fill
            className="object-cover"
            sizes={
              featured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            }
          />
        </m.div>

        {/* Gradient overlay — bottom-to-top dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Red left-border accent — expands from w-0 on CSS group-hover */}
        <div className="absolute left-0 top-0 h-full w-0 bg-mission-red transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[3px]" />

        {/* Bottom-anchored text */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="mb-1.5 block font-display text-[10px] uppercase tracking-[0.15em] text-mission-red">
            {program.badge}
          </span>
          <h3 className="font-display font-bold uppercase leading-tight text-white text-[22px]">
            {program.title}
          </h3>
          <p className="mt-1 font-sans text-[13px] leading-snug text-mission-gray-300">
            {program.description}
          </p>
        </div>
      </m.article>
    </Link>
  );
}

export function ProgramGrid({ images }: ProgramGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion() ?? false;

  const featured = PROGRAMS.filter((p) => p.featured);
  const small = PROGRAMS.filter((p) => !p.featured);

  return (
    <section id="programs" className="bg-mission-black px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4">Train Like You Mean It</h2>
        <p className="mb-10 text-mission-gray-300 md:mb-16">
          Seven programs. Real instruction. Find yours.
        </p>

        <div ref={ref} className="space-y-4">
          {/* Top row — 2 featured 16/9 cards (~50% wide each) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {featured.map((p, i) => (
              <ProgramCard
                key={p.slug}
                program={p}
                index={i}
                imageUrl={images?.[p.slug]}
                isInView={isInView}
                reduced={reduced}
                featured
              />
            ))}
          </div>

          {/* Bottom row — 5 smaller 4/3 cards, flex-wrap responsive */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {small.map((p, i) => (
              <ProgramCard
                key={p.slug}
                program={p}
                index={i + featured.length}
                imageUrl={images?.[p.slug]}
                isInView={isInView}
                reduced={reduced}
                featured={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
