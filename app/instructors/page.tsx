import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildBreadcrumbList, GYM } from "@/lib/schema";
import { INSTRUCTORS } from "@/lib/instructors";

export const metadata: Metadata = buildMetadata({
  title: "Our Instructors",
  description:
    "Meet the world-class coaches at Mission MMA & Fitness in Chicago's West Loop — including Said Hatim, a BJJ second-degree black belt, former professional kickboxer, and undefeated MMA competitor.",
  path: "/instructors",
  keywords: [
    "martial arts coaches chicago",
    "bjj instructor chicago",
    "muay thai coach chicago",
    "west loop martial arts coaches",
    "said hatim",
    "mission mma coaches",
  ],
});

export default function InstructorsPage() {
  return (
    <main>
      <JsonLdScript
        data={buildBreadcrumbList([
          { name: "Home", url: GYM.url },
          { name: "Instructors", url: `${GYM.url}/instructors` },
        ])}
      />

      {/* Page header */}
      <section className="w-full bg-mission-black px-4 py-16 text-center md:px-8 md:py-24">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wider text-mission-white md:text-5xl lg:text-6xl">
          Meet Our Instructors
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-mission-gray-300">
          World-class coaches. Real-world experience.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-flex items-center rounded-md bg-mission-red px-8 py-3.5 font-display text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-mission-red-dark"
        >
          Book a Free Class
        </Link>
      </section>

      {/* Instructor card grid */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {INSTRUCTORS.map((instructor) => (
            <article
              key={instructor.slug}
              className="group rounded-lg border border-mission-gray-700 bg-mission-gray-900 transition-colors hover:border-mission-red"
            >
              {/* Photo — square crop, object-cover, object-top */}
              <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                <Image
                  src={instructor.photo}
                  alt={`${instructor.name}, ${instructor.title} at Mission MMA & Fitness Chicago`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Card body */}
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold uppercase text-mission-white">
                  {instructor.name}
                </h2>
                <p className="mt-1 font-medium text-mission-red">
                  {instructor.title}
                </p>

                {/* Discipline badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {instructor.disciplines.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-mission-gray-700 px-3 py-1 text-xs font-medium text-mission-white"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Short bio — exactly 2 paragraphs */}
                <div className="mt-4 space-y-3">
                  {instructor.shortBio.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-mission-gray-300">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Read more text link — not a filled button */}
                <Link
                  href={`/instructors/${instructor.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-medium text-mission-red transition-colors hover:text-mission-white"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
