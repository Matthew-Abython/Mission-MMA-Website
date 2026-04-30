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

const SLUG = "strength-conditioning";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
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
    question:
      "How often should I add strength training to my martial arts schedule?",
    answer:
      "1–2 strength sessions per week alongside 3–4 martial arts classes is a sustainable, productive plan for most members.",
  },
];

export const metadata: Metadata = buildClassPageMetadata({
  className: "Strength & Conditioning",
  slug: SLUG,
  title:
    "Strength & Conditioning Chicago | Mission MMA & Fitness — Functional Training",
  description:
    "Functional strength and conditioning in Chicago's West Loop, designed to support Brazilian Jiu-Jitsu, Muay Thai, and MMA training. Beginner-friendly. Free trial.",
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
});

const CONTENT: ClassPageContent = {
  title:
    "Strength and Conditioning in Chicago — Built for Martial Artists at Mission MMA & Fitness",
  dek: "Functional strength and conditioning designed to support BJJ, Muay Thai, and MMA training. Tuesday and Thursday 6:30 AM at Mission MMA & Fitness in Chicago's West Loop.",
  heroImage: "/strengthandconditioning.jpg",
  heroImageAlt:
    "Strength and conditioning training at Mission MMA & Fitness in Chicago",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness offers functional strength and conditioning at 1620 W Carroll Ave in Chicago's West Loop. Our program — sometimes called \"Better Than Bootcamp\" — combines mobility, strength, and conditioning work designed to support and complement martial arts training. Whether you're a Brazilian Jiu-Jitsu or Muay Thai athlete looking to add structured strength work, or a Chicago resident searching for functional fitness that goes beyond generic gym workouts, our coaches build sessions around real movement patterns.",
  whatYoullLearn: [
    "Strength patterns that transfer to grappling: hip hinges, pulling, and core stability under load",
    "Mobility work that keeps you on the mats: spine, hip, and shoulder health built into every session",
    "Conditioning that matches martial arts demands: work-to-rest intervals, not long slow cardio",
  ],
  whoFor: [
    "BJJ or Muay Thai practitioners who want structured strength work to support their martial arts",
    "Chicago residents looking for intelligent functional fitness beyond generic gym workouts",
    "Athletes at any level — sessions are scaled for complete beginners and experienced lifters alike",
  ],
  qualitySignals: [
    {
      title: "Built for Martial Artists",
      body: "Programming considers grapplers' shoulder and hip needs, strikers' rotational power, and fighters' work capacity — not generic CrossFit-style volume.",
    },
    {
      title: "Mobility-First",
      body: "Sessions include real mobility work, not just stretching at the end. Mobility under load is what keeps you on the mats long-term.",
    },
    {
      title: "Tied to the Gym Ecosystem",
      body: "Members can pair strength sessions with BJJ and Muay Thai for a complete training plan — all under one roof at 1620 W Carroll Ave.",
    },
    {
      title: "Coaches Who Understand Combat Sports",
      body: "Programming is designed to build attributes that transfer to grappling and striking, not just general fitness aesthetics.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Claim Your Free Strength & Conditioning Trial",
  finalCtaHref: "/book",
};

export default function StrengthConditioningPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "Strength and Conditioning",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: [
              "Strength and Conditioning",
              "Functional Fitness",
              "Martial Arts Strength Training",
            ],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "Strength & Conditioning", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
