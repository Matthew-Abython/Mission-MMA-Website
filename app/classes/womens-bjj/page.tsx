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

const SLUG = "womens-bjj";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
  {
    question:
      "Do I need any martial arts experience to start women's BJJ?",
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
      "Our coed BJJ classes run morning, midday, and evening throughout the week, so you can always supplement. We're also open to feedback on adding more women-specific sessions if demand grows.",
  },
];

export const metadata: Metadata = buildClassPageMetadata({
  className: "Women's Brazilian Jiu-Jitsu",
  slug: SLUG,
  title: "Women's Brazilian Jiu-Jitsu Chicago | Mission MMA & Fitness",
  description:
    "Women's-only Brazilian Jiu-Jitsu (BJJ / jiu-jitsu) classes in Chicago's West Loop. Dedicated weekly classes plus a women's open mat. Beginner-friendly. Free trial.",
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
});

const CONTENT: ClassPageContent = {
  title:
    "Women's Brazilian Jiu-Jitsu in Chicago — Train at Mission MMA & Fitness",
  dek: "Women's-only BJJ classes in Chicago's West Loop. Two weekly sessions plus a Saturday women's open mat — same instruction quality as the coed program.",
  heroImage:
    "https://images.pexels.com/photos/7991578/pexels-photo-7991578.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroImageAlt: "Women's Brazilian Jiu-Jitsu training at Mission MMA & Fitness",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness offers a dedicated Women's Brazilian Jiu-Jitsu program at 1620 W Carroll Ave in Chicago's West Loop. Whether you're searching for women's BJJ, women's jiu-jitsu, women's-only jiu jitsu classes, or women's self-defense in Chicago, our program is built specifically for women — taught in a women-only environment with women-only training partners. We run two weekly women's BJJ classes plus a Saturday women's open mat, alongside a full coed program for members who want both.",
  whatYoullLearn: [
    "Foundational positions and escapes: guard, side control, mount, and back — in a women-only training environment",
    "Technique-first drilling that builds correct movement patterns before live training",
    "Submissions and submission defense: how to finish and how to survive",
    "Live rolling with appropriate partners, introduced gradually as you build confidence",
  ],
  whoFor: [
    "Women with no martial arts background looking for effective, technique-based self-defense",
    "Experienced BJJ practitioners who want a dedicated women-only training option",
    "Women cross-training from other martial arts who want focused grappling practice",
  ],
  qualitySignals: [
    {
      title: "Dedicated Women-Only Classes",
      body: "Two weekly women's BJJ sessions where the room is exclusively women — beginners through experienced practitioners.",
    },
    {
      title: "Women's Open Mat",
      body: "Saturday women-only open mat for live training in a comfortable space — rare in Chicago's martial arts landscape.",
    },
    {
      title: "Same Instruction Quality as the Coed Program",
      body: "Not a watered-down 'women's' version — same techniques, same coach lineage, same path to belt promotions.",
    },
    {
      title: "Pathway to Coed Training",
      body: "Members can train women's-only, coed, or both. Many start women's-only and add coed classes as confidence grows.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Claim Your Free Women's BJJ Trial Class",
  finalCtaHref: "/book",
};

export default function WomensBjjPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "Women's Brazilian Jiu-Jitsu",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: [
              "Women's BJJ",
              "Women's Jiu Jitsu",
              "Women's Jiu-Jitsu",
              "Women's Brazilian Jiu-Jitsu",
            ],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "Women's BJJ", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
