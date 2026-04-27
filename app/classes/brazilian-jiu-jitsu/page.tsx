import type { Metadata } from "next";
import { buildClassPageMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildCourse,
  buildFaqPage,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";
import {
  ClassPageTemplate,
  type ClassPageContent,
} from "@/components/sections/class-page-template";

const SLUG = "brazilian-jiu-jitsu";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
  {
    question:
      "Do I need any experience to start Brazilian Jiu-Jitsu at Mission MMA?",
    answer:
      "No — our fundamentals classes are designed for complete beginners. You'll learn in a welcoming environment alongside partners of all experience levels. Many of our most enthusiastic members started as adults with zero martial arts background.",
  },
  {
    question: "What's the difference between BJJ, jiu jitsu, and jujitsu?",
    answer:
      'They refer to the same art at our school. "Brazilian Jiu-Jitsu" is the full name; "BJJ" is the common abbreviation; "jiu jitsu" and "jiu-jitsu" are common spelling variants. "Jujitsu" or "jujutsu" technically refer to older Japanese systems, but in everyday usage the terms are used interchangeably to describe what we teach.',
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

export const metadata: Metadata = buildClassPageMetadata({
  className: "Brazilian Jiu-Jitsu",
  slug: SLUG,
  title: "Brazilian Jiu-Jitsu Chicago | Mission MMA & Fitness — West Loop BJJ",
  description:
    "Train Brazilian Jiu-Jitsu (BJJ / jiu-jitsu) at Mission MMA in Chicago's West Loop. High-quality Gi and No-Gi instruction for beginners through advanced. Free trial class.",
  keywords: [
    "brazilian jiu jitsu chicago",
    "bjj chicago",
    "jiu jitsu chicago",
    "jiu-jitsu chicago",
    "jujitsu chicago",
    "best brazilian jiu jitsu chicago",
    "high quality jiu jitsu instruction chicago",
    "bjj west loop",
    "bjj no gi chicago",
    "bjj gi chicago",
  ],
});

const CONTENT: ClassPageContent = {
  title: "Brazilian Jiu-Jitsu in Chicago — High-Quality BJJ Instruction",
  dek: "Gi and No-Gi grappling at Mission MMA & Fitness in Chicago's West Loop. Beginners through advanced. 9 BJJ-related classes per week including a dedicated women's program.",
  heroImage:
    "https://images.pexels.com/photos/8990063/pexels-photo-8990063.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroImageAlt: "Brazilian Jiu-Jitsu training at Mission MMA & Fitness",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness offers high-quality Brazilian Jiu-Jitsu training at 1620 W Carroll Ave in Chicago's West Loop, minutes from Fulton Market and West Town. Our Brazilian Jiu-Jitsu program — also called BJJ, jiu jitsu, jiu-jitsu, or jujitsu — teaches both Gi and No-Gi classes across morning, midday, and evening schedules. Built on the same grappling art the Gracie family brought to the world stage and that defines the modern UFC, BJJ rewards leverage and technique over strength. Beginners and experienced grapplers train together under coaches with verifiable lineage and competition experience.",
  whatYoullLearn: [
    "Fundamental positions, escapes, and submissions in both Gi and No-Gi formats",
    "Live rolling (sparring) under controlled conditions — the fastest way to progress",
    "Pressure passing, guard retention, and submission chains as you advance",
    "Mental composure under physical stress that translates outside the mat",
  ],
  whoFor: [
    "Complete beginners with zero martial arts background",
    "Experienced grapplers cross-training from wrestling, judo, or other arts",
    "Competitors training for IBJJF or local Chicago tournaments",
  ],
  qualitySignals: [
    {
      title: "Verifiable Coach Lineage",
      body: "Our BJJ instructors have traceable belt lineage and active competition experience. We'll be happy to share specific lineage details on the instructor pages once published.",
    },
    {
      title: "Both Gi and No-Gi Every Week",
      body: "Many Chicago gyms offer only one format. We teach both — currently 9 BJJ-specific classes per week across both formats, plus open mat and women's-specific sessions.",
    },
    {
      title: "Live Training Every Class",
      body: "Beyond technique drilling, every class includes live rolling or positional sparring. Live training is how you actually get good at jiu-jitsu, not just how you build a curriculum.",
    },
    {
      title: "Dedicated Women's Program",
      body: "A women's-only BJJ class plus a women's open mat — rare in Chicago. See our Women's BJJ program for details.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Claim Your Free BJJ Trial Class",
  finalCtaHref: `/free-trial?interest=${SLUG}`,
};

export default function BrazilianJiuJitsuPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "Brazilian Jiu-Jitsu",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: [
              "BJJ",
              "Jiu Jitsu",
              "Jiu-Jitsu",
              "Brazilian Jiu-Jitsu",
              "Jujitsu",
            ],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "Brazilian Jiu-Jitsu", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
