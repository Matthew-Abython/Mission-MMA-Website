import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildBreadcrumbList } from "@/lib/schema";

// TODO: populate with real slugs once instructor bios are provided
const VALID_SLUGS: string[] = [];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) {
    return buildMetadata({
      title: "Coach Not Found",
      description: "This coach profile does not exist.",
      path: `/instructors/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: `Coach Profile — ${slug}`,
    description: `Instructor profile for ${slug} at Mission MMA & Fitness in Chicago's West Loop.`,
    path: `/instructors/${slug}`,
  });
}

export default async function InstructorDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={buildBreadcrumbList([
          { name: "Home", url: "https://missionmmachicago.com" },
          { name: "Coaches", url: "https://missionmmachicago.com/instructors" },
          { name: slug, url: `https://missionmmachicago.com/instructors/${slug}` },
        ])}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/instructors">Coaches</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{slug}</li>
          </ol>
        </nav>
        <h1>Coach Profile</h1>
        <p className="text-lg text-muted-foreground">
          This coach profile is being prepared. Check back soon or{" "}
          <Link href="/contact" className="hover:text-mission-red transition-colors">
            contact us
          </Link>{" "}
          to learn more about our instructors.
        </p>
        {/* TODO Phase 2: full instructor bio, belt rank, lineage, competition record */}
      </article>
    </main>
  );
}
