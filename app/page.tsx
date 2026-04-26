import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildLocalBusiness } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Mission MMA & Fitness — Chicago's Premier BJJ & Muay Thai Gym",
  description:
    "Train Brazilian Jiu-Jitsu, Muay Thai, and MMA at Mission MMA & Fitness in Chicago's West Loop. High-quality instruction for adults, women, and kids. Free trial class.",
  path: "/",
  keywords: [
    "martial arts chicago",
    "mma gym chicago",
    "brazilian jiu jitsu chicago",
    "muay thai chicago",
    "west loop martial arts",
  ],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript data={buildLocalBusiness()} />
      <article className="mx-auto max-w-4xl space-y-6">
        <h1>Mission MMA &amp; Fitness — Chicago&apos;s Premier BJJ &amp; Muay Thai Gym</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness is a martial arts gym in Chicago&apos;s West Loop offering
          high-quality Brazilian Jiu-Jitsu (BJJ), Muay Thai (Thai boxing), and MMA instruction at
          1620 W Carroll Ave. Whether you&apos;re searching for jiu jitsu, jiu-jitsu, or jujitsu
          classes — or for legitimate Muay Thai kickboxing instruction — our coaches teach
          beginners through advanced students with verifiable lineage and competition experience.
        </p>
        <nav aria-label="Programs">
          <ul className="space-y-2">
            <li><Link href="/classes/brazilian-jiu-jitsu" className="hover:text-mission-red transition-colors">Brazilian Jiu-Jitsu (BJJ)</Link></li>
            <li><Link href="/classes/muay-thai" className="hover:text-mission-red transition-colors">Muay Thai</Link></li>
            <li><Link href="/classes/mma" className="hover:text-mission-red transition-colors">MMA</Link></li>
            <li><Link href="/classes/womens-bjj" className="hover:text-mission-red transition-colors">Women&apos;s BJJ</Link></li>
            <li><Link href="/classes/kids" className="hover:text-mission-red transition-colors">Kids Martial Arts</Link></li>
            <li><Link href="/classes/open-mat" className="hover:text-mission-red transition-colors">Open Mat</Link></li>
            <li><Link href="/classes/strength-conditioning" className="hover:text-mission-red transition-colors">Strength &amp; Conditioning</Link></li>
          </ul>
        </nav>
        <p>
          <Link href="/free-trial" className="font-bold hover:text-mission-red transition-colors">
            Claim your free trial class →
          </Link>
        </p>
        {/* TODO Phase 2: hero video, program grid, testimonials, schedule preview */}
      </article>
    </main>
  );
}
