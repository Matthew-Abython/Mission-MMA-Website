import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildLocalBusiness,
} from "@/lib/schema";
import { HeroGeometric } from "@/components/sections/hero-geometric";
import { ProgramGrid } from "@/components/sections/program-grid";
import { WhyTrainHere } from "@/components/sections/why-train-here";
import { StatCounters } from "@/components/sections/stat-counters";
import { TestimonialMarquee } from "@/components/sections/testimonial-marquee";
import { LeadForm } from "@/components/forms/lead-form";
import { FaqSection } from "@/components/sections/faq-section";
import { FAQ_ITEMS, HOME_FAQ_IDS } from "@/lib/faq-data";

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
  const homeFaqs = FAQ_ITEMS.filter((q) => HOME_FAQ_IDS.includes(q.id));

  return (
    <>
      <JsonLdScript data={buildLocalBusiness()} />

      {/* TODO: Add videoUrl="/hero.mp4" prop when gym footage is available. */}
      <HeroGeometric />

      {/* TODO: Replace with real Mission MMA photos when available.
          Pass images={{ "bjj": "/images/bjj.jpg", "muay-thai": "/images/muay-thai.jpg", ... }}
          Supported slugs: "bjj" | "muay-thai" | "mma" | "womens-bjj" | "kids" | "open-mat" | "strength-conditioning" */}
      <ProgramGrid />

      <WhyTrainHere />

      <StatCounters />

      <TestimonialMarquee />

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

      <FaqSection items={homeFaqs} />

      <section className="bg-mission-gray-900 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-white/10 bg-mission-black/60 p-6 md:p-10">
            <div className="text-center">
              <h2>Claim Your Free Class</h2>
              <p className="mt-3 text-mission-gray-300">
                Your first class is on us. Brazilian Jiu-Jitsu, Muay Thai, MMA,
                and more.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-md">
              <LeadForm source="home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
