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
  title: "Strength & Conditioning Chicago | Mission MMA & Fitness — Functional Training",
  description:
    "Functional strength and conditioning in Chicago's West Loop, designed to support Brazilian Jiu-Jitsu, Muay Thai, and MMA training. Beginner-friendly. Free trial.",
  path: "/classes/strength-conditioning",
  keywords: [
    "strength and conditioning chicago",
    "martial arts strength training chicago",
    "fighter strength conditioning chicago",
    "functional fitness chicago",
    "functional training chicago",
    "strength and conditioning for martial artists chicago",
    "mma strength training chicago",
    "functional fitness west loop",
    "strength training west loop chicago",
  ],
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "Do I need to be a martial artist to take this class?",
    answer:
      "No — anyone can join. The class is structured around functional movement that benefits everyone. Martial artists get specific transfer; general fitness members get a smart, well-programmed strength session.",
  },
  {
    question: "How is this different from CrossFit or a typical bootcamp?",
    answer:
      "We focus on quality of movement before intensity. Sessions emphasize mobility, sound technique under load, and conditioning that builds rather than burns you out. There's no \"as many reps as possible\" mentality at the cost of form.",
  },
  {
    question: "Is this just lifting weights?",
    answer:
      "No. Sessions blend bodyweight movement, mobility, weighted strength work, and conditioning intervals. Equipment varies — kettlebells, barbells, dumbbells, sleds, and bodyweight.",
  },
  {
    question: "How does this support BJJ or Muay Thai?",
    answer:
      "Grapplers gain stronger hips and shoulders, more mobile spines, and better work capacity for long rolls. Strikers gain rotational power, stronger core, and conditioning that holds up over multiple rounds.",
  },
  {
    question: "I'm new to strength training — is this beginner-friendly?",
    answer:
      "Yes. Coaches scale every session for the experience level in the room. Beginners get instruction and modifications; experienced lifters get the same session at higher intensity.",
  },
  {
    question: "How often should I add strength training to my martial arts schedule?",
    answer:
      "1–2 strength sessions per week alongside 3–4 martial arts classes is a sustainable, productive plan for most members.",
  },
];

export default function StrengthConditioningPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "Strength and Conditioning",
            description:
              "Functional strength and conditioning designed for martial artists at Mission MMA & Fitness in Chicago's West Loop. Tuesday and Thursday 6:30 AM.",
            url: "https://missionmmachicago.com/classes/strength-conditioning",
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "Strength & Conditioning", url: "https://missionmmachicago.com/classes/strength-conditioning" },
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
            <li aria-current="page">Strength &amp; Conditioning</li>
          </ol>
        </nav>
        <h1>Strength and Conditioning in Chicago — Built for Martial Artists at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers functional strength and conditioning at 1620 W Carroll
          Ave in Chicago&apos;s West Loop. Our program — sometimes called &ldquo;Better Than
          Bootcamp&rdquo; — combines mobility, strength, and conditioning work designed to support
          and complement martial arts training. Whether you&apos;re a Brazilian Jiu-Jitsu or Muay
          Thai athlete looking to add structured strength work, or a Chicago resident searching for
          functional fitness that goes beyond generic gym workouts, our coaches build sessions
          around real movement patterns.
        </p>
        <p>
          <Link href="/free-trial?interest=strength-conditioning" className="font-bold hover:text-mission-red transition-colors">
            Claim your free Strength &amp; Conditioning trial →
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
          <Link href="/classes/mma" className="hover:text-mission-red transition-colors">MMA</Link> ·{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Schedule</Link>
        </p>
      </article>
    </main>
  );
}
