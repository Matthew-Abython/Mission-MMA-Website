import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildLocalBusiness,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = buildMetadata({
  title: "Free Trial Class at Mission MMA & Fitness — Chicago West Loop",
  description:
    "Claim your free trial class at Mission MMA & Fitness in Chicago's West Loop. Try Brazilian Jiu-Jitsu, Muay Thai, MMA, Women's BJJ, or Kids Martial Arts with no commitment.",
  path: "/free-trial",
  keywords: [
    "free trial martial arts chicago",
    "free bjj class chicago",
    "free muay thai class chicago",
    "try martial arts chicago",
    "free trial west loop martial arts",
  ],
  absoluteTitle: true,
});

const VALID_INTERESTS = new Set([
  "brazilian-jiu-jitsu",
  "muay-thai",
  "mma",
  "womens-bjj",
  "kids",
  "strength-conditioning",
]);

export default async function FreeTrialPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const params = await searchParams;
  const interest =
    params.interest && VALID_INTERESTS.has(params.interest)
      ? params.interest
      : undefined;

  return (
    <>
      <JsonLdScript
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Free Trial", url: `${GYM.url}/free-trial` },
          ]),
        ]}
      />

      <main>
        <section className="bg-mission-black px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left column — H1 + sales copy */}
            <div className="space-y-6">
              <h1>
                Claim Your Free Class at Mission MMA &amp; Fitness
              </h1>
              <p className="text-lg text-mission-gray-300 md:text-xl">
                Your first class is on us — Brazilian Jiu-Jitsu, Muay Thai,
                MMA, Women&apos;s BJJ, Kids, or Strength &amp; Conditioning.
                No commitment, no pressure. Just come train.
              </p>
              <ul className="space-y-2 text-mission-gray-300">
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mission-red"
                    aria-hidden="true"
                  />
                  We&apos;ll text you within 24 hours to schedule
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mission-red"
                    aria-hidden="true"
                  />
                  Bring athletic clothes — we provide everything else
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mission-red"
                    aria-hidden="true"
                  />
                  Beginners welcome — no martial arts experience needed
                </li>
              </ul>
            </div>

            {/* Right column — form */}
            <div className="rounded-lg border border-white/10 bg-mission-gray-900/40 p-6 md:p-8">
              <h2 className="font-display text-xl uppercase text-mission-white md:text-2xl">
                Get Started
              </h2>
              <p className="mt-2 text-sm text-mission-gray-300">
                Fill out the form and a coach will reach out shortly.
              </p>
              <div className="mt-6">
                <LeadForm
                  source="free-trial-hero"
                  defaultInterest={interest}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
