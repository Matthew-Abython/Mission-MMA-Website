import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Our Coaches",
  description:
    "Meet the coaches at Mission MMA & Fitness in Chicago's West Loop — Brazilian Jiu-Jitsu, Muay Thai, and MMA instructors with verifiable lineage and competition experience.",
  path: "/instructors",
  keywords: [
    "martial arts coaches chicago",
    "bjj instructor chicago",
    "muay thai coach chicago",
    "west loop martial arts coaches",
  ],
});

export default function InstructorsPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={buildBreadcrumbList([
          { name: "Home", url: "https://missionmmachicago.com" },
          { name: "Coaches", url: "https://missionmmachicago.com/instructors" },
        ])}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Coaches</li>
          </ol>
        </nav>
        <h1>Our Coaches</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness is staffed by coaches with verifiable lineage and real
          competition experience across Brazilian Jiu-Jitsu, Muay Thai, and MMA. Detailed
          instructor bios are being compiled and will be published here shortly.
        </p>
        <p className="text-muted-foreground">
          Detailed coach profiles coming soon. To learn more about our coaches in the meantime,
          please <Link href="/contact" className="hover:text-mission-red transition-colors">contact us</Link>.
        </p>
        {/* TODO Phase 2: coach card grid with photos, belt ranks, lineage */}
      </article>
    </main>
  );
}
