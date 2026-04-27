import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildLocalBusiness,
} from "@/lib/schema";
import { HomeHero } from "@/components/sections/home-hero";

export const metadata: Metadata = buildMetadata({
  title: "Mission MMA & Fitness — Chicago's Premier BJJ & Muay Thai Gym",
  description:
    "Train Brazilian Jiu-Jitsu (BJJ), Muay Thai, and MMA at Mission MMA & Fitness in Chicago's West Loop. High-quality instruction for adults, women, and kids. Free trial class.",
  path: "/",
  keywords: [
    "martial arts chicago",
    "mma gym chicago",
    "brazilian jiu jitsu chicago",
    "muay thai chicago",
    "west loop martial arts",
    "bjj chicago",
    "thai boxing chicago",
  ],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={buildLocalBusiness()} />

      <HomeHero
        headline="Chicago's Premier BJJ & Muay Thai Gym"
        subhead="Train Brazilian Jiu-Jitsu, Muay Thai, and MMA at Mission MMA & Fitness in Chicago's West Loop. High-quality instruction for beginners, experienced grapplers and strikers, women, and kids."
        ctaLabel="Claim Your Free Class"
        ctaHref="/free-trial"
      />

      {/* Below-the-fold content — entity-rich prose for SEO/AIO. Will expand in Steps 2.2–2.4. */}
      <section className="bg-mission-black px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-pretty text-lg text-mission-gray-300 md:text-xl">
            Mission MMA &amp; Fitness is a martial arts gym in Chicago&apos;s
            West Loop offering high-quality Brazilian Jiu-Jitsu (BJJ), Muay
            Thai (Thai boxing), and MMA instruction at 1620 W Carroll Ave.
            Whether you&apos;re searching for jiu jitsu, jiu-jitsu, or jujitsu
            classes — or for legitimate Muay Thai kickboxing instruction — our
            coaches teach beginners through advanced students with verifiable
            lineage and competition experience.
          </p>
        </div>
      </section>
    </>
  );
}
