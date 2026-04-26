import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildLocalBusiness, buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Mission MMA & Fitness",
  description:
    "About Mission MMA & Fitness in Chicago's West Loop — high-quality BJJ, Muay Thai, MMA, and strength and conditioning, plus the Mission Empower nonprofit arm focused on at-risk youth and women's self-defense.",
  path: "/about",
  keywords: [
    "about mission mma chicago",
    "martial arts gym west loop chicago",
    "mission mma fitness chicago",
  ],
});

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "About", url: "https://missionmmachicago.com/about" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">About</li>
          </ol>
        </nav>
        <h1>About Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness opened in Chicago&apos;s West Loop with a mission to coach,
          motivate, and inspire the residents of greater Chicago to step beyond their limits. We
          are home to high-quality Brazilian Jiu-Jitsu, Muay Thai, MMA, and strength and
          conditioning instruction, plus the Mission Empower nonprofit arm focused on at-risk
          youth, special needs, and women&apos;s self-defense.
        </p>
        {/* TODO Phase 2: gym story, photo gallery, Mission Empower section, team section */}
        <p className="text-muted-foreground">
          Located at 1620 W Carroll Ave, Chicago, IL 60612 — in the heart of the West Loop.
        </p>
        <p>
          <Link href="/free-trial" className="font-bold hover:text-mission-red transition-colors">
            Claim your free trial class →
          </Link>
        </p>
      </article>
    </main>
  );
}
