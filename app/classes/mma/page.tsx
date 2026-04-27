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

const SLUG = "mma";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
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

export const metadata: Metadata = buildClassPageMetadata({
  className: "MMA",
  slug: SLUG,
  title:
    "MMA Classes Chicago | Mission MMA & Fitness — West Loop Mixed Martial Arts",
  description:
    "Train mixed martial arts (MMA) at Mission MMA & Fitness in Chicago's West Loop. Striking, grappling, and full-rules MMA for beginners through competitors. Free trial class.",
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
});

const CONTENT: ClassPageContent = {
  title: "MMA Training in Chicago — Mixed Martial Arts at Mission MMA & Fitness",
  dek: "Striking, grappling, and full-rules MMA at Mission MMA & Fitness in Chicago's West Loop. Built on legitimate BJJ and Muay Thai foundations in the same facility.",
  heroImage:
    "https://images.pexels.com/photos/9012462/pexels-photo-9012462.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroImageAlt: "MMA training at Mission MMA & Fitness",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness offers mixed martial arts (MMA) training at 1620 W Carroll Ave in Chicago's West Loop. MMA combines the striking of Muay Thai with the grappling of Brazilian Jiu-Jitsu, the takedowns of wrestling, and the conditioning to put it all together. Whether you're new to martial arts and curious about the sport that defines the modern UFC, or an experienced striker or grappler looking to round out your skill set, our MMA program meets you where you are.",
  whatYoullLearn: [
    "Striking combinations from Muay Thai integrated with takedowns and grappling transitions",
    "Takedown offense and defense — closing the distance from striking range to the ground",
    "Ground-and-pound and submission defense from dominant MMA positions",
    "How to combine all three ranges — stand-up, clinch, and ground — in live sparring",
  ],
  whoFor: [
    "Beginners curious about MMA after watching the UFC who want to learn the real sport",
    "Experienced BJJ or wrestling practitioners who want to add striking and compete",
    "Muay Thai athletes looking to add grappling for MMA competition or cross-training",
  ],
  qualitySignals: [
    {
      title: "Built on Legitimate Foundations",
      body: "Our MMA program is supported by world-class Brazilian Jiu-Jitsu and Muay Thai instruction at the same facility — not bolted on as a marketing label.",
    },
    {
      title: "Verifiable Coach Competition Experience",
      // TODO: update quality signal once instructor bios are provided
      body: "Our MMA coaches have verifiable competition backgrounds — specific records and lineage will appear on instructor pages once published.",
    },
    {
      title: "Real Training, Not Cardio MMA",
      body: "Sessions integrate striking, takedowns, ground work, and live MMA sparring under controlled rules — the same structure used to prepare fighters.",
    },
    {
      title: "Path for Competitors",
      body: "Members training for amateur or professional MMA receive structured programming, sparring partners at appropriate experience levels, and corner support at fights.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Claim Your Free MMA Trial Class",
  finalCtaHref: `/free-trial?interest=${SLUG}`,
};

export default function MmaPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "MMA",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: ["Mixed Martial Arts"],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "MMA", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
