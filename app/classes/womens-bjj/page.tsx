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
  title: "Women's Brazilian Jiu-Jitsu Chicago | Mission MMA & Fitness",
  description:
    "Women's-only Brazilian Jiu-Jitsu (BJJ / jiu-jitsu) classes in Chicago's West Loop. Dedicated weekly classes plus a women's open mat. Beginner-friendly. Free trial.",
  path: "/classes/womens-bjj",
  keywords: [
    "womens brazilian jiu jitsu chicago",
    "womens bjj chicago",
    "womens jiu jitsu chicago",
    "women's jiu-jitsu chicago",
    "womens only jiu jitsu chicago",
    "womens jujitsu chicago",
    "best womens jiu jitsu chicago",
    "high quality womens bjj chicago",
    "womens self defense chicago",
    "jiu jitsu for women chicago",
    "self defense classes for women chicago",
  ],
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "Do I need any martial arts experience to start women's BJJ?",
    answer:
      "No — our classes are designed to welcome complete beginners. You'll learn fundamentals in a supportive environment alongside other women at all experience levels.",
  },
  {
    question: "Is the class actually women-only?",
    answer:
      "Yes. Our scheduled women's BJJ classes and women's open mat are women-only training environments. Coed classes run separately for members who want them.",
  },
  {
    question: "What should I wear?",
    answer:
      "For your free trial, athletic clothes are fine. Once enrolled, you'll want a BJJ gi (kimono) for Gi classes and athletic shorts with a rash guard for No-Gi classes.",
  },
  {
    question: "Will I have to roll (live-train) right away?",
    answer:
      "No. Beginners spend their early weeks on technique, drilling, and positional work. Live rolling is introduced gradually and always with appropriate partners. You can always tap to reset.",
  },
  {
    question: "Why train BJJ as a woman?",
    answer:
      "BJJ is built on leverage, technique, and positional control rather than strength — making it one of the most effective martial arts for self-defense, regardless of size differences. It's also one of the lowest-injury combat sports because submissions replace strikes.",
  },
  {
    question: "Is this a self-defense class?",
    answer:
      "Brazilian Jiu-Jitsu is the foundation of practical grappling self-defense. While we don't market it as a \"self-defense class\" specifically, the skills you build directly translate to real-world physical confidence and self-protection.",
  },
  {
    question: "Can I train women's-only and coed classes both?",
    answer:
      "Yes. Many members do exactly that — women's-only sessions for a comfortable home base, coed classes to access more weekly mat time. Your membership covers both.",
  },
  {
    question: "What if I can't make the women's class times?",
    answer:
      "Our coed BJJ classes run morning, midday, and evening throughout the week, so you can always supplement. We're also open to feedback on adding more women's-specific sessions if demand grows.",
  },
];

export default function WomensBjjPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "Women's Brazilian Jiu-Jitsu",
            description:
              "Women-only Brazilian Jiu-Jitsu classes plus a women's open mat at Mission MMA & Fitness in Chicago's West Loop. Beginner-friendly, same instruction quality as the coed program.",
            url: "https://missionmmachicago.com/classes/womens-bjj",
            alternateNames: ["BJJ", "Jiu Jitsu", "Jiu-Jitsu", "Brazilian Jiu-Jitsu", "Jujitsu"],
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "Women's BJJ", url: "https://missionmmachicago.com/classes/womens-bjj" },
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
            <li aria-current="page">Women&apos;s BJJ</li>
          </ol>
        </nav>
        <h1>Women&apos;s Brazilian Jiu-Jitsu in Chicago — Train at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers a dedicated Women&apos;s Brazilian Jiu-Jitsu program at
          1620 W Carroll Ave in Chicago&apos;s West Loop. Whether you&apos;re searching for
          women&apos;s BJJ, women&apos;s jiu-jitsu, women&apos;s-only jiu jitsu classes, or
          women&apos;s self-defense in Chicago, our program is built specifically for women —
          taught in a women-only environment with women-only training partners. We run two weekly
          women&apos;s BJJ classes plus a Saturday women&apos;s open mat, alongside a full coed
          program for members who want both.
        </p>
        <p>
          <Link href="/free-trial?interest=womens-bjj" className="font-bold hover:text-mission-red transition-colors">
            Claim your free Women&apos;s BJJ trial class →
          </Link>
        </p>
        {/* TODO Phase 2: hero image, schedule grid filtered to womens */}
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
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Full Schedule</Link>
        </p>
      </article>
    </main>
  );
}
