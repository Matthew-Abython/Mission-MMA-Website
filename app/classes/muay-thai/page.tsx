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
  title: "Muay Thai Chicago | Mission MMA & Fitness — West Loop Thai Boxing",
  description:
    "Train authentic Muay Thai (Thai boxing, kickboxing) at Mission MMA in Chicago's West Loop. High-quality instruction for beginners through advanced. Free trial class.",
  path: "/classes/muay-thai",
  keywords: [
    "muay thai chicago",
    "thai boxing chicago",
    "muay thai kickboxing chicago",
    "muay thai classes chicago",
    "kickboxing chicago",
    "best muay thai chicago",
    "high quality muay thai instruction chicago",
    "legitimate muay thai gym chicago",
    "authentic muay thai chicago",
    "muay thai west loop",
    "thai boxing west loop",
    "muay thai fulton market",
    "muay thai near me chicago",
  ],
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "Do I need any experience to start Muay Thai at Mission MMA?",
    answer:
      "No — our classes welcome beginners. You'll start with fundamentals: stance, basic punches and kicks, clinch work, and partner drills. Sparring is never required and only happens in the dedicated sparring class.",
  },
  {
    question: "What's the difference between Muay Thai, kickboxing, and Thai boxing?",
    answer:
      "\"Thai boxing\" and \"Muay Thai\" mean the same thing — Thailand's national sport, sometimes called \"the art of eight limbs\" because it uses fists, elbows, knees, and shins. \"Muay Thai kickboxing\" is a common Western label. Generic \"kickboxing\" usually refers to a watered-down cardio version that doesn't include elbows, knees, or clinch work. We teach the full art.",
  },
  {
    question: "What gear do I need?",
    answer:
      "For your free trial, athletic clothes and bare feet are fine. Once you enroll, you'll want hand wraps, boxing gloves (12 or 14oz), shin guards for sparring, and a mouthguard. We can recommend brands and sizes during your first week.",
  },
  {
    question: "Do I have to spar?",
    answer:
      "No. Sparring is offered as a separate class for members who want it. Our regular Muay Thai classes are technique- and padwork-focused with no live striking required.",
  },
  {
    question: "What makes Mission MMA's Muay Thai instruction high quality?",
    answer:
      "Coaches with verifiable Thai-style training and competition experience, real padwork rounds rather than cardio choreography, a dedicated sparring class for those who want it, and class structure modeled on traditional Thai gyms — shadowboxing through technique through padwork through clinch.",
  },
  {
    question: "How often should I train?",
    answer:
      "2–3 classes per week is the sweet spot for beginners. Recovery matters in striking — pad rounds and shin conditioning are demanding. Most members increase to 4–5 weekly sessions after a few months.",
  },
  {
    question: "Is Muay Thai good for self-defense?",
    answer:
      "Yes. The combination of distance management, powerful kicks, knees in the clinch, and elbows makes Muay Thai one of the most practical striking arts. We pair it with our Brazilian Jiu-Jitsu program for members who want a complete self-defense skill set.",
  },
  {
    question: "Can I compete in Muay Thai?",
    answer:
      "Yes — we have members who compete at amateur and professional levels. Competition isn't required and you don't have to spar to be a member.",
  },
  {
    question: "Are the coaches available outside class for technique questions?",
    answer:
      "Yes — coaches stay after class for questions, and private lessons are available for members who want personalized work.",
  },
];

export default function MuayThaiPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "Muay Thai",
            description:
              "Authentic Muay Thai (Thai boxing) instruction for beginners through advanced at Mission MMA & Fitness in Chicago's West Loop.",
            url: "https://missionmmachicago.com/classes/muay-thai",
            alternateNames: ["Muay Thai", "Thai Boxing", "Muay Thai Kickboxing"],
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "Muay Thai", url: "https://missionmmachicago.com/classes/muay-thai" },
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
            <li aria-current="page">Muay Thai</li>
          </ol>
        </nav>
        <h1>Muay Thai in Chicago — Authentic Thai Boxing Instruction at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers authentic Muay Thai training at 1620 W Carroll Ave in
          Chicago&apos;s West Loop. Known as Thai boxing or Muay Thai kickboxing, this striking
          art teaches the use of fists, elbows, knees, and shins through traditional Thai padwork,
          clinch work, and live sparring. Whether you&apos;re a complete beginner looking for
          high-quality kickboxing in Chicago or an experienced striker seeking legitimate Muay Thai
          instruction, our coaches teach the full art — not a watered-down cardio version. We run
          nine adult Muay Thai classes a week plus a dedicated sparring class.
        </p>
        <p>
          <Link href="/free-trial?interest=muay-thai" className="font-bold hover:text-mission-red transition-colors">
            Claim your free Muay Thai trial class →
          </Link>
        </p>
        {/* TODO Phase 2: hero image, schedule grid filtered to Muay Thai */}
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
          See also: <Link href="/classes/mma" className="hover:text-mission-red transition-colors">MMA Classes</Link> ·{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Full Schedule</Link> ·{" "}
          <Link href="/instructors" className="hover:text-mission-red transition-colors">Our Coaches</Link>
        </p>
      </article>
    </main>
  );
}
