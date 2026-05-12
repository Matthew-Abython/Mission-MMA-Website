import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildLocalBusiness,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";

const URL = `${GYM.url}/about`;

export const metadata: Metadata = buildMetadata({
  title: "About Mission MMA & Fitness — Chicago's West Loop Martial Arts Gym",
  description:
    "Mission MMA & Fitness is a Brazilian Jiu-Jitsu, Muay Thai, and MMA gym in Chicago's West Loop, home to the Mission Empower nonprofit serving at-risk youth, special needs, and women's self-defense.",
  path: "/about",
  keywords: [
    "about mission mma chicago",
    "mission empower chicago",
    "martial arts community chicago",
    "west loop mma gym",
  ],
});

const MISSION_EMPOWER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Mission Empower, Inc.",
  description:
    "Nonprofit arm of Mission MMA & Fitness providing martial arts and self-defense programming for at-risk youth, individuals with special needs, and women's self-defense.",
  parentOrganization: {
    "@type": ["LocalBusiness", "MartialArtsSchool"],
    "@id": `${GYM.url}/#gym`,
    name: GYM.name,
    url: GYM.url,
  },
  address: {
    "@type": "PostalAddress",
    ...GYM.address,
  },
  url: `${GYM.url}/about#mission-empower`,
};

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildLocalBusiness(),
          MISSION_EMPOWER_SCHEMA,
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "About", url: URL },
          ]),
        ]}
      />

      <main>
        {/* Hero strip */}
        <section className="relative bg-mission-black px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h1>About Mission MMA &amp; Fitness</h1>
            <p className="mt-6 max-w-2xl text-lg text-mission-gray-300 md:text-xl">
              Chicago&apos;s West Loop home for high-quality Brazilian
              Jiu-Jitsu, Muay Thai, and MMA — and home base for the Mission
              Empower nonprofit.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-mission-gray-300">
            <h2>Our Story</h2>
            <p>
              Mission MMA &amp; Fitness opened in Chicago&apos;s West Loop with
              a simple goal: to coach, motivate, and inspire the residents of
              greater Chicago to step beyond their limits. We built a facility
              for serious students of Brazilian Jiu-Jitsu, Muay Thai, and MMA —
              one that welcomes complete beginners and supports lifelong
              practitioners with equal seriousness.
            </p>
            <p>
              The gym is at 1620 W Carroll Ave, minutes from Fulton Market and
              West Town. We run 30 classes per week across our seven programs:
              Brazilian Jiu-Jitsu (Gi and No-Gi), Muay Thai, MMA,
              women&apos;s-only BJJ, kids martial arts, open mat, and strength
              and conditioning. Every class is taught by coaches with verifiable
              lineage and competition experience — not template instruction.
            </p>
          </div>
        </section>

        {/* Facility */}
        <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-mission-gray-300">
            <h2>Our Facility</h2>
            <p>
              The Mission MMA mat space is built for serious training. Full-size
              competition mats accommodate live rolling, padwork, and sparring
              without crowding. Heavy bags, kick shields, and padwork stations
              support the Muay Thai program. Strength and conditioning equipment
              shares the floor for cross-training between disciplines.
            </p>
            <p>
              Locker rooms with showers mean you can train before or after work
              without compromise. Free street parking and proximity to the Pink
              and Green CTA lines make us accessible from across Chicago.
            </p>
          </div>
        </section>

        {/* Mission Empower */}
        <section
          id="mission-empower"
          className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-3xl space-y-6 text-mission-gray-300">
            <h2>Mission Empower</h2>
            <p>
              Mission Empower, Inc. is the nonprofit arm of Mission MMA &amp;
              Fitness. We believe martial arts training has a place beyond the
              regular membership rolls — for at-risk youth who benefit from the
              structure and confidence martial arts provides, for individuals
              with special needs who deserve adapted instruction, and for women
              seeking practical self-defense skills in a supportive environment.
            </p>
            <p>
              Mission Empower programs run alongside our standard class schedule
              and are made possible by donations, partnerships with Chicago
              community organizations, and the volunteer time of our coaches. To
              learn more about Mission Empower programming or how to support it,
              please{" "}
              <Link
                href="/contact"
                className="underline decoration-mission-red decoration-2 underline-offset-4 hover:text-mission-white"
              >
                reach out via our contact page
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2>Train With Us</h2>
            <p className="mt-4 text-mission-gray-300">
              Your first class is on us. No commitment, no pressure — just come
              train.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-mission-red px-10 py-4 text-base font-bold uppercase tracking-wider text-mission-white transition-all duration-300 hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black md:text-lg"
            >
              Claim Your Free Trial Class
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
