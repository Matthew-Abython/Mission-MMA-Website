import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildBreadcrumbList, buildPerson, GYM } from "@/lib/schema";
import { INSTRUCTORS } from "@/lib/instructors";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INSTRUCTORS.map((instructor) => ({ slug: instructor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const instructor = INSTRUCTORS.find((i) => i.slug === slug);
  if (!instructor) {
    return buildMetadata({
      title: "Instructor Not Found",
      description: "This instructor profile does not exist.",
      path: `/instructors/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: `${instructor.name} — ${instructor.title} | Mission MMA & Fitness`,
    description: instructor.shortBio.join(" "),
    path: `/instructors/${instructor.slug}`,
    keywords: [
      instructor.name.toLowerCase(),
      ...instructor.disciplines.map((d) => `${d.toLowerCase()} chicago`),
      "chicago martial arts instructor",
      "west loop mma coach",
    ],
    absoluteTitle: true,
  });
}

export default async function InstructorDetailPage({ params }: Props) {
  const { slug } = await params;
  const instructor = INSTRUCTORS.find((i) => i.slug === slug);

  if (!instructor) {
    notFound();
  }

  const personSchema = buildPerson({
    name: instructor.name,
    slug: instructor.slug,
    jobTitle: instructor.title,
    bio: instructor.shortBio.join(" "),
    image: `${GYM.url}${instructor.photo}`,
    beltRank: "Brazilian Jiu-Jitsu Second-Degree Black Belt",
    lineage: "Brasa affiliation",
    yearsTraining: 38,
    competitionRecord:
      "Former professional kickboxer, undefeated MMA competitor, Illinois State Kickboxing Champion, world title challenger, professional submission grappler",
  });

  return (
    <main>
      <JsonLdScript
        data={[
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Instructors", url: `${GYM.url}/instructors` },
            {
              name: instructor.name,
              url: `${GYM.url}/instructors/${instructor.slug}`,
            },
          ]),
          personSchema,
        ]}
      />

      {/* Section 1 — Dark header bar */}
      <section className="w-full bg-mission-black px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/instructors"
                  className="text-mission-gray-500 transition-colors hover:text-mission-white"
                >
                  Instructors
                </Link>
              </li>
              <li aria-hidden="true" className="text-mission-gray-700">›</li>
              <li className="text-mission-gray-300">{instructor.name}</li>
            </ol>
          </nav>

          <h1 className="font-display text-5xl font-bold uppercase tracking-wider text-mission-white md:text-6xl">
            {instructor.name}
          </h1>

          <p className="mt-2 text-lg font-medium text-mission-red">
            {instructor.title}
          </p>

          {/* Discipline badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {instructor.disciplines.map((d) => (
              <span
                key={d}
                className="rounded-full bg-mission-gray-700 px-3 py-1 text-xs font-medium text-mission-white"
              >
                {d}
              </span>
            ))}
          </div>

          <Link
            href="/book"
            className="mt-8 inline-flex items-center rounded-md bg-mission-red px-8 py-3.5 font-display text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-mission-red-dark"
          >
            Book a Free Class
          </Link>
        </div>
      </section>

      {/* Section 2 — Two-column photo + bio */}
      <section className="w-full px-4 py-12 md:px-8 md:py-16" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">

            {/* Left column — portrait photo (~40%) */}
            <div className="w-full flex-shrink-0 md:w-2/5">
              <div className="relative h-[420px] overflow-hidden rounded-lg md:h-[580px]">
                <Image
                  src={instructor.heroPhoto ?? instructor.photo}
                  alt={`${instructor.name}, ${instructor.title} at Mission MMA & Fitness Chicago`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: instructor.heroPhotoPosition ?? "center" }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Right column — full bio (~60%) */}
            <div className="w-full md:w-3/5">
              <div className="space-y-5">
                {instructor.fullBio.map((para, i) => (
                  <p
                    key={i}
                    className="text-[18px] text-mission-gray-300"
                    style={{ lineHeight: "1.8" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <Link
                href="/instructors"
                className="mt-10 inline-flex items-center text-sm font-medium text-mission-red transition-colors hover:text-mission-white"
              >
                ← All Instructors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
