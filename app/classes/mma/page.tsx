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
  title: "MMA Classes Chicago | Mission MMA & Fitness — West Loop Mixed Martial Arts",
  description:
    "Train mixed martial arts (MMA) at Mission MMA & Fitness in Chicago's West Loop. Striking, grappling, and full-rules MMA for beginners through competitors. Free trial class.",
  path: "/classes/mma",
  keywords: [
    "mma classes chicago",
    "mixed martial arts chicago",
    "mma training chicago",
    "mma gym chicago",
    "mma west loop",
    "best mma gym chicago",
    "legitimate mma training chicago",
    "high quality mma instruction chicago",
    "mma west loop chicago",
    "mixed martial arts west loop",
    "mma fulton market",
  ],
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "Do I need any experience to start MMA?",
    answer:
      "No, but most beginners start with one foundational discipline (BJJ or Muay Thai) and add MMA-specific training as they get comfortable. We can advise on a starting plan during your free trial.",
  },
  {
    question: "What's the difference between MMA, BJJ, and Muay Thai?",
    answer:
      "Brazilian Jiu-Jitsu is the grappling and ground-fighting art. Muay Thai is the striking art. MMA combines both with takedowns and live sparring under unified rules — what you see in the UFC.",
  },
  {
    question: "Do I have to spar to train MMA?",
    answer:
      "No. Foundational MMA work is technique-based: striking from the clinch, transitioning between standing and ground, takedown defense. Live MMA sparring is offered for members who want it and is always controlled and supervised.",
  },
  {
    question: "Is MMA safe for beginners?",
    answer:
      "Yes — when taught correctly. Our coaches build skills progressively. Beginners spend their first months learning fundamentals, drilling technique, and building conditioning before any contact work.",
  },
  {
    question: "Can I train for amateur or professional MMA fights?",
    answer:
      "Yes. Members training to compete receive structured programming, sparring partners at appropriate experience levels, and corner support at amateur and professional events.",
  },
  {
    question: "What makes Mission MMA's MMA program high quality?",
    answer:
      "Three things: a foundation of legitimate Brazilian Jiu-Jitsu and Muay Thai training in the same facility, coaches with verifiable competition experience, and a clear training path from beginner through competitor.",
  },
  {
    question: "What's a typical MMA training week?",
    answer:
      "For a serious member: 2 BJJ classes, 2 Muay Thai classes, 1–2 MMA-specific sessions, plus strength and conditioning. Beginners can do less and still progress.",
  },
  {
    question: "Do you have wrestling instruction?",
    answer:
      "Wrestling is integrated into our MMA program through takedown technique and takedown defense. We don't run a separate freestyle/folkstyle wrestling class.",
  },
];

export default function MmaPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "MMA",
            description:
              "Mixed martial arts training combining Brazilian Jiu-Jitsu, Muay Thai, and wrestling for beginners through competitors at Mission MMA & Fitness in Chicago's West Loop.",
            url: "https://missionmmachicago.com/classes/mma",
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "MMA", url: "https://missionmmachicago.com/classes/mma" },
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
            <li aria-current="page">MMA</li>
          </ol>
        </nav>
        <h1>MMA Training in Chicago — Mixed Martial Arts at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers mixed martial arts (MMA) training at 1620 W Carroll
          Ave in Chicago&apos;s West Loop. MMA combines the striking of Muay Thai with the
          grappling of Brazilian Jiu-Jitsu, the takedowns of wrestling, and the conditioning to
          put it all together. Whether you&apos;re new to martial arts and curious about the sport
          that defines the modern UFC, or an experienced striker or grappler looking to round out
          your skill set, our MMA program meets you where you are.
        </p>
        <p>
          <Link href="/free-trial?interest=mma" className="font-bold hover:text-mission-red transition-colors">
            Claim your free MMA trial class →
          </Link>
        </p>
        {/* TODO Phase 2: hero image, schedule grid */}
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
          <Link href="/classes/brazilian-jiu-jitsu" className="hover:text-mission-red transition-colors">Brazilian Jiu-Jitsu</Link> ·{" "}
          <Link href="/classes/muay-thai" className="hover:text-mission-red transition-colors">Muay Thai</Link> ·{" "}
          <Link href="/classes/strength-conditioning" className="hover:text-mission-red transition-colors">Strength &amp; Conditioning</Link> ·{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Schedule</Link>
        </p>
      </article>
    </main>
  );
}
