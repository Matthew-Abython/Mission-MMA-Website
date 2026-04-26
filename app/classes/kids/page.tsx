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
  title: "Kids Martial Arts Chicago | Kids Muay Thai & BJJ at Mission MMA",
  description:
    "Kids martial arts in Chicago's West Loop — Muay Thai four days a week and Brazilian Jiu-Jitsu (BJJ) on Saturdays. Builds confidence, focus, and discipline. Free trial.",
  path: "/classes/kids",
  keywords: [
    "kids martial arts chicago",
    "kids muay thai chicago",
    "kids bjj chicago",
    "kids jiu jitsu chicago",
    "kids brazilian jiu jitsu chicago",
    "childrens martial arts chicago",
    "kids martial arts west loop",
    "best kids martial arts chicago",
    "kids martial arts near me chicago",
    "kids muay thai west loop",
    "kids jiu jitsu west loop",
    "kids self defense chicago",
  ],
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "What ages are the kids classes for?",
    answer:
      "[Confirm with gym. Common range: 4–12. Update FAQ once confirmed.]",
  },
  {
    question: "What's the difference between Kids Muay Thai and Kids BJJ?",
    answer:
      "Kids Muay Thai is striking-focused — punches, kicks, knees, footwork — taught with safety gear and partner drills. Kids Brazilian Jiu-Jitsu is grappling — body control, takedowns, ground positioning, submissions — without strikes. Both build coordination, discipline, and confidence in different ways.",
  },
  {
    question: "Do kids spar or fight?",
    answer:
      "Sparring in kids classes is highly controlled, age-appropriate, and supervised. Most class time is technique, drilling, and games that build skills. Competition is optional — never required.",
  },
  {
    question: "Will my child get hurt?",
    answer:
      "Kids martial arts at our facility have a strong safety record. Coaches prioritize controlled training. Brazilian Jiu-Jitsu in particular has one of the lowest injury rates of any youth sport.",
  },
  {
    question: "What does my child need to bring?",
    answer:
      "For a trial class, comfortable athletic clothes work fine. Once enrolled, kids need a BJJ gi for Kids BJJ and Muay Thai gloves + shin guards for Kids Muay Thai (we'll guide sizing).",
  },
  {
    question: "How often should my child train?",
    answer:
      "1–2 classes per week is plenty for most kids and produces visible progress over a few months. Some kids end up wanting to come 3+ times.",
  },
  {
    question: "Can my child do both Kids Muay Thai and Kids BJJ?",
    answer:
      "Yes — and we encourage it for kids who are ready. Schedule allows kids to train Muay Thai during the week and BJJ on Saturday.",
  },
  {
    question: "What's the trial process?",
    answer:
      "Bring your child for a free trial class. They'll be welcomed by the coach, paired with a friendly partner, and learn the basics. We'll talk with you afterward about whether it's a good fit.",
  },
  {
    question: "What benefits do parents typically notice?",
    answer:
      "Improved focus, increased confidence, better physical fitness, and a constructive outlet for energy. Many parents report better behavior at home and school within weeks.",
  },
];

export default function KidsPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "Kids Martial Arts",
            description:
              "Kids Muay Thai (four days a week) and Kids Brazilian Jiu-Jitsu (Saturdays) at Mission MMA & Fitness in Chicago's West Loop. Separate programs with real age-appropriate instruction.",
            url: "https://missionmmachicago.com/classes/kids",
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "Kids Martial Arts", url: "https://missionmmachicago.com/classes/kids" },
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
            <li aria-current="page">Kids Martial Arts</li>
          </ol>
        </nav>
        <h1>Kids Martial Arts in Chicago — Muay Thai and Brazilian Jiu-Jitsu for Children</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers two kids martial arts programs in Chicago&apos;s West
          Loop at 1620 W Carroll Ave: Kids Muay Thai (Thai boxing) four days a week and Kids
          Brazilian Jiu-Jitsu (kids BJJ / kids jiu jitsu) on Saturdays. Unlike many Chicago gyms
          that combine kids striking and grappling into a single watered-down session, we run them
          separately so kids actually learn the art. Our programs build confidence, focus, and
          discipline through real martial arts skills — not babysitting with belts.
        </p>
        <p>
          <Link href="/free-trial?interest=kids" className="font-bold hover:text-mission-red transition-colors">
            Claim your child&apos;s free trial class →
          </Link>
        </p>
        {/* TODO Phase 2: hero image, schedule grid filtered to kids */}
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
          See also:{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Full Schedule</Link> ·{" "}
          <Link href="/about" className="hover:text-mission-red transition-colors">Mission Empower</Link>
        </p>
      </article>
    </main>
  );
}
