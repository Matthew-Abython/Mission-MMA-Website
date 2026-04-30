import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildBreadcrumbList, buildPerson, GYM } from "@/lib/schema";
import { ClassPageHero } from "@/components/sections/class-page-hero";
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

      <ClassPageHero
        title={instructor.name}
        subtitle={instructor.title}
        imageSrc={instructor.heroPhoto ?? instructor.photo}
        imageAlt={`${instructor.name}, ${instructor.title} at Mission MMA & Fitness Chicago`}
        breadcrumbs={[
          { label: "Instructors", href: "/instructors" },
          { label: instructor.name },
        ]}
        ctaText="Book a Free Class"
        ctaHref="/book"
        imagePosition={instructor.heroPhotoPosition ?? "center"}
      />

      {/* Bio section */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Discipline badges */}
          <div className="mb-8 flex flex-wrap gap-2">
            {instructor.disciplines.map((d) => (
              <span
                key={d}
                className="rounded-full bg-mission-gray-700 px-4 py-1.5 text-sm font-medium text-mission-white"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Full bio — all paragraphs, no collapse */}
          <div className="space-y-5">
            {instructor.fullBio.map((para, i) => (
              <p
                key={i}
                className="text-[18px] leading-relaxed text-mission-gray-300"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Back link */}
          <Link
            href="/instructors"
            className="mt-10 inline-flex items-center text-sm font-medium text-mission-red transition-colors hover:text-mission-white"
          >
            ← All Instructors
          </Link>
        </div>
      </section>
    </main>
  );
}
