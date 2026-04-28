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

const SLUG = "muay-thai";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
  {
    question: "Do I need any experience to start Muay Thai at Mission MMA?",
    answer:
      "No — our classes welcome beginners. You'll start with fundamentals: stance, basic punches and kicks, clinch work, and partner drills. Sparring is never required and only happens in the dedicated sparring class.",
  },
  {
    question:
      "What's the difference between Muay Thai, kickboxing, and Thai boxing?",
    answer:
      '"Thai boxing" and "Muay Thai" mean the same thing — Thailand\'s national sport, sometimes called "the art of eight limbs" because it uses fists, elbows, knees, and shins. "Muay Thai kickboxing" is a common Western label. Generic "kickboxing" usually refers to a watered-down cardio version that doesn\'t include elbows, knees, or clinch work. We teach the full art.',
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
    question:
      "Are the coaches available outside class for technique questions?",
    answer:
      "Yes — coaches stay after class for questions, and private lessons are available for members who want personalized work.",
  },
];

export const metadata: Metadata = buildClassPageMetadata({
  className: "Muay Thai",
  slug: SLUG,
  title: "Muay Thai Chicago | Mission MMA & Fitness — West Loop Thai Boxing",
  description:
    "Train authentic Muay Thai (Thai boxing, kickboxing) at Mission MMA in Chicago's West Loop. High-quality instruction for beginners through advanced. Free trial class.",
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
});

const CONTENT: ClassPageContent = {
  title:
    "Muay Thai in Chicago — Authentic Thai Boxing Instruction at Mission MMA & Fitness",
  dek: "Authentic Thai boxing at Mission MMA & Fitness in Chicago's West Loop. Nine adult classes per week plus a dedicated sparring class — the full art, not cardio kickboxing.",
  heroImage:
    "https://images.pexels.com/photos/4754149/pexels-photo-4754149.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroImageAlt: "Muay Thai padwork training at Mission MMA & Fitness",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness offers authentic Muay Thai training at 1620 W Carroll Ave in Chicago's West Loop. Known as Thai boxing or Muay Thai kickboxing, this striking art teaches the use of fists, elbows, knees, and shins through traditional Thai padwork, clinch work, and live sparring. Whether you're a complete beginner looking for high-quality kickboxing in Chicago or an experienced striker seeking legitimate Muay Thai instruction, our coaches teach the full art — not a watered-down cardio version. We run nine adult Muay Thai classes a week plus a dedicated sparring class.",
  whatYoullLearn: [
    "The eight weapons of Muay Thai: fists, elbows, knees, and shins — combined into striking sequences",
    "Traditional Thai padwork structure: shadowboxing, technique drilling, pad rounds, and clinch work",
    "Clinch work and close-range fighting — including the knees and elbows most cardio classes skip",
    "Conditioning specific to striking: shin conditioning, cardio endurance, and round-based stamina",
  ],
  whoFor: [
    "Complete beginners who want real Muay Thai — not a cardio kickboxing class",
    "Experienced strikers looking for authentic Thai-style padwork and clinch instruction",
    "Grapplers and MMA fighters adding a striking discipline to their game",
  ],
  qualitySignals: [
    {
      title: "Verifiable Coach Lineage",
      // TODO: update quality signal once instructor bios are provided
      body: "Our Muay Thai coaches have verifiable training lineage from established Thai-style gyms — specific lineage details will appear on instructor pages once published.",
    },
    {
      title: "Real Thai Padwork, Not Cardio Kickboxing",
      body: "Our classes follow the structure used in Thailand: shadowboxing, technique, padwork, clinch, conditioning. Not a fitness class with gloves.",
    },
    {
      title: "Dedicated Sparring Class",
      body: "Adult Muay Thai Sparring on Mondays at 6:30 PM lets advanced members test their work safely with controlled contact — separate from the technique classes.",
    },
    {
      title: "Kids Program",
      body: "Separate Kids Muay Thai class four days a week — many Chicago gyms only offer one or two kids sessions weekly.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Claim Your Free Muay Thai Trial Class",
  finalCtaHref: "/book",
};

export default function MuayThaiPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "Muay Thai",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: ["Muay Thai", "Thai Boxing", "Muay Thai Kickboxing"],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "Muay Thai", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
