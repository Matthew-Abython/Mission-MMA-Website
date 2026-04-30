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

const SLUG = "kids";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
  {
    // TODO: confirm kids age range with gym, then update FAQ #1 answer
    question: "What ages are the kids classes for?",
    answer:
      "Our kids programs welcome children from approximately 4–12 years old, with placement based on age and experience. Reach out via the contact form to confirm fit for your child.",
  },
  {
    question:
      "What's the difference between Kids Muay Thai and Kids BJJ?",
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

export const metadata: Metadata = buildClassPageMetadata({
  className: "Kids Martial Arts",
  slug: SLUG,
  title: "Kids Martial Arts Chicago | Kids Muay Thai & BJJ at Mission MMA",
  description:
    "Kids martial arts in Chicago's West Loop — Muay Thai four days a week and Brazilian Jiu-Jitsu (BJJ) on Saturdays. Builds confidence, focus, and discipline. Free trial.",
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
});

const CONTENT: ClassPageContent = {
  title:
    "Kids Martial Arts in Chicago — Muay Thai and Brazilian Jiu-Jitsu for Children",
  dek: "Two real programs — Kids Muay Thai (four days a week) and Kids Brazilian Jiu-Jitsu (Saturdays) — at Mission MMA & Fitness in Chicago's West Loop. Real instruction, not babysitting.",
  heroImage: "/kidsmartialarts.jpg",
  heroImageAlt:
    "Kids martial arts class at Mission MMA & Fitness in Chicago",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness offers two kids martial arts programs in Chicago's West Loop at 1620 W Carroll Ave: Kids Muay Thai (Thai boxing) four days a week and Kids Brazilian Jiu-Jitsu (kids BJJ / kids jiu jitsu) on Saturdays. Unlike many Chicago gyms that combine kids striking and grappling into a single watered-down session, we run them separately so kids actually learn the art. Our programs build confidence, focus, and discipline through real martial arts skills — not babysitting with belts.",
  whatYoullLearn: [
    "Muay Thai fundamentals: proper stance, punches, kicks, and footwork taught safely with pads",
    "Brazilian Jiu-Jitsu basics: body awareness, takedowns, and ground positioning without strikes",
    "Focus, discipline, and respect — built through structured training rather than lectures",
    "Confidence that comes from mastering real skills and seeing measurable progress over time",
  ],
  whoFor: [
    "Children new to martial arts looking for structure, discipline, and a healthy physical outlet",
    "Kids who want to try Muay Thai striking, BJJ grappling, or both",
    "Parents seeking a serious kids martial arts program — not after-school daycare with belts",
  ],
  qualitySignals: [
    {
      title: "Two Separate Disciplines, Not Combined",
      body: "Kids Muay Thai and Kids BJJ each run as their own class with appropriate technique progression — not a single watered-down 'martial arts' session.",
    },
    {
      title: "Five Kids Classes Weekly",
      body: "Four Kids Muay Thai sessions per week plus Kids BJJ on Saturday morning — one of the most consistent kids schedules in Chicago.",
    },
    {
      title: "Real Instruction, Age-Appropriate",
      body: "Kids learn proper technique — the same fundamentals as adults, scaled for kid safety and attention spans. Not games masquerading as martial arts.",
    },
    {
      title: "Builds Focus That Translates to School",
      body: "Parents consistently report improvements in attention, behavior, and confidence within weeks of starting. The structure of martial arts training transfers.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Claim Your Child's Free Trial Class",
  finalCtaHref: "/book",
};

export default function KidsPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "Kids Martial Arts",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: [
              "Kids Martial Arts",
              "Kids Muay Thai",
              "Kids BJJ",
              "Kids Jiu Jitsu",
              "Kids Jiu-Jitsu",
              "Kids Brazilian Jiu-Jitsu",
            ],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "Kids Martial Arts", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
