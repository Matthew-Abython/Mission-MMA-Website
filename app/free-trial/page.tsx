import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildLocalBusiness, buildBreadcrumbList, GYM } from "@/lib/schema";

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

export default function FreeTrialPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Free Trial", url: "https://missionmmachicago.com/free-trial" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Free Trial</li>
          </ol>
        </nav>
        <h1>Claim Your Free Class at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers a free trial class for anyone interested in Brazilian
          Jiu-Jitsu (BJJ), Muay Thai, MMA, Women&apos;s BJJ, Kids Martial Arts, or Strength and
          Conditioning at our gym at 1620 W Carroll Ave in Chicago&apos;s West Loop. No commitment,
          no experience required — just show up, meet the coaches, and try a class.
        </p>
        <section className="space-y-3">
          <h2>How to Claim Your Free Class</h2>
          <p className="text-muted-foreground">
            Call or text us at{" "}
            <a href={`tel:${GYM.telephone}`} className="font-medium text-foreground hover:text-mission-red transition-colors">
              (312) 265-1856
            </a>{" "}
            or email{" "}
            <a href={`mailto:${GYM.email}`} className="font-medium text-foreground hover:text-mission-red transition-colors">
              {GYM.email}
            </a>{" "}
            to schedule your free trial. Let us know which class you&apos;re interested in and we&apos;ll
            get you set up for the next available session.
          </p>
        </section>
        <section className="space-y-3">
          <h2>What to Bring</h2>
          <p className="text-muted-foreground">
            Athletic clothes and a water bottle. We have changing facilities. No equipment needed
            — we&apos;ll guide you through everything on your first day.
          </p>
        </section>
        {/* TODO Phase 3: inline contact form replacing call/email CTA */}
        <p className="pt-4 text-sm text-muted-foreground">
          Explore our programs:{" "}
          <Link href="/classes/brazilian-jiu-jitsu" className="hover:text-mission-red transition-colors">BJJ</Link> ·{" "}
          <Link href="/classes/muay-thai" className="hover:text-mission-red transition-colors">Muay Thai</Link> ·{" "}
          <Link href="/classes/mma" className="hover:text-mission-red transition-colors">MMA</Link> ·{" "}
          <Link href="/classes/womens-bjj" className="hover:text-mission-red transition-colors">Women&apos;s BJJ</Link> ·{" "}
          <Link href="/classes/kids" className="hover:text-mission-red transition-colors">Kids</Link>
        </p>
      </article>
    </main>
  );
}
