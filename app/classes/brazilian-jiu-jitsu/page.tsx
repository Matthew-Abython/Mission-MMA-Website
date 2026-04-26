import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildCourse,
  buildFaqPage,
  buildBreadcrumbList,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Brazilian Jiu-Jitsu Chicago | Mission MMA & Fitness — West Loop BJJ",
  description:
    "Train Brazilian Jiu-Jitsu (BJJ / jiu-jitsu) at Mission MMA in Chicago's West Loop. High-quality Gi and No-Gi instruction for beginners through advanced. Free trial class.",
  path: "/classes/brazilian-jiu-jitsu",
  keywords: [
    "brazilian jiu jitsu chicago",
    "bjj chicago",
    "jiu jitsu chicago",
    "jiu-jitsu chicago",
    "brazilian jiu-jitsu chicago",
    "jujitsu chicago",
    "best brazilian jiu jitsu chicago",
    "high quality jiu jitsu instruction chicago",
    "legitimate bjj chicago",
    "top jiu jitsu gym chicago",
    "gracie jiu jitsu chicago",
    "bjj west loop",
    "jiu jitsu west loop",
    "brazilian jiu jitsu fulton market",
    "bjj no gi chicago",
    "bjj gi chicago",
    "no-gi jiu jitsu chicago",
  ],
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "Do I need any experience to start Brazilian Jiu-Jitsu at Mission MMA?",
    answer:
      "No — our fundamentals classes are designed for complete beginners. You'll learn in a welcoming environment alongside partners of all experience levels. Many of our most enthusiastic members started as adults with zero martial arts background.",
  },
  {
    question: "What's the difference between BJJ, jiu jitsu, and jujitsu?",
    answer:
      "They refer to the same art at our school. \"Brazilian Jiu-Jitsu\" is the full name; \"BJJ\" is the common abbreviation; \"jiu jitsu\" and \"jiu-jitsu\" are common spelling variants. \"Jujitsu\" or \"jujutsu\" technically refer to older Japanese systems, but in everyday usage the terms are used interchangeably to describe what we teach.",
  },
  {
    question: "What should I wear to my first class?",
    answer:
      "For your free trial, athletic clothes work fine. Once you enroll, you'll want a BJJ gi (kimono) for Gi classes and athletic shorts with a rash guard for No-Gi classes.",
  },
  {
    question: "What's the difference between Gi and No-Gi BJJ?",
    answer:
      "Gi BJJ uses a traditional kimono with grips on the fabric — closer to the art's origins and the format used in IBJJF tournaments. No-Gi uses athletic wear and emphasizes body locks, underhooks, and grips that work without fabric — closer to the grappling you'd see in MMA. We teach both throughout the week so you can train in either format.",
  },
  {
    question: "What makes Mission MMA's BJJ program high quality?",
    answer:
      "Three things: coaches with verifiable lineage and active competition experience, both Gi and No-Gi formats taught every week, and live training (rolling) built into every class — not just technique drilling. We also run a dedicated women's-only BJJ program and a women's open mat.",
  },
  {
    question: "How often should I train as a beginner?",
    answer:
      "We recommend 2–3 classes per week to build consistency without overtraining. Most members increase their frequency as they get comfortable.",
  },
  {
    question: "Is jiu jitsu safe?",
    answer:
      "Brazilian Jiu-Jitsu has one of the lowest injury rates of any combat sport because live training involves submissions rather than strikes. You can tap at any moment to reset. Our coaches prioritize controlled, safe training.",
  },
  {
    question: "How long does it take to earn a blue belt in BJJ?",
    answer:
      "Typically 18–24 months of consistent training. Everyone progresses at their own pace, and we treat promotions as milestones rather than deadlines.",
  },
  {
    question: "Do you offer women's-only Brazilian Jiu-Jitsu classes?",
    answer:
      "Yes. See our Women's BJJ program for dedicated women's classes and a women's open mat.",
  },
  {
    question: "Can I compete in BJJ tournaments through Mission MMA?",
    answer:
      "Yes — we have members competing at every level, from local Chicago tournaments to IBJJF events. Competition is encouraged but never required to advance.",
  },
];

export default function BjjPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "Brazilian Jiu-Jitsu",
            description:
              "High-quality Gi and No-Gi Brazilian Jiu-Jitsu instruction for beginners through advanced at Mission MMA & Fitness in Chicago's West Loop.",
            url: "https://missionmmachicago.com/classes/brazilian-jiu-jitsu",
            alternateNames: ["BJJ", "Jiu Jitsu", "Jiu-Jitsu", "Brazilian Jiu-Jitsu", "Jujitsu"],
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "Brazilian Jiu-Jitsu", url: "https://missionmmachicago.com/classes/brazilian-jiu-jitsu" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/classes">Classes</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Brazilian Jiu-Jitsu</li>
          </ol>
        </nav>
        <h1>Brazilian Jiu-Jitsu in Chicago — High-Quality BJJ Instruction at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers high-quality Brazilian Jiu-Jitsu training at 1620 W
          Carroll Ave in Chicago&apos;s West Loop, minutes from Fulton Market and West Town. Our
          Brazilian Jiu-Jitsu program — also called BJJ, jiu jitsu, jiu-jitsu, or jujitsu —
          teaches both Gi and No-Gi classes across morning, midday, and evening schedules. Built
          on the same grappling art the Gracie family brought to the world stage and that defines
          the modern UFC, BJJ rewards leverage and technique over strength. Beginners and
          experienced grapplers train together under coaches with verifiable lineage and
          competition experience.
        </p>
        <p>
          <Link href="/free-trial?interest=brazilian-jiu-jitsu" className="font-bold hover:text-mission-red transition-colors">
            Claim your free BJJ trial class →
          </Link>
        </p>
        {/* TODO Phase 2: hero image, schedule grid filtered to BJJ */}
        <section className="space-y-6 pt-4">
          <h2>Frequently Asked Questions</h2>
          {faqItems.map((item, i) => (
            <div key={i} className="space-y-1">
              <h3>{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </section>
        <p className="pt-4 text-sm text-muted-foreground">
          See also: <Link href="/classes/womens-bjj" className="hover:text-mission-red transition-colors">Women&apos;s BJJ</Link> ·{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Full Schedule</Link> ·{" "}
          <Link href="/instructors" className="hover:text-mission-red transition-colors">Our Coaches</Link>
        </p>
      </article>
    </main>
  );
}
