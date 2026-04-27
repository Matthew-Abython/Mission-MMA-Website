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

const SLUG = "open-mat";
const URL = `${GYM.url}/classes/${SLUG}`;

const FAQ = [
  {
    question: "Can I drop in for open mat if I'm not a member?",
    answer:
      "Visitors from other gyms are welcome at our open mat sessions. We ask that you bring your own gear and follow standard BJJ open mat etiquette. Contact us before your first visit so we can confirm details.",
  },
  {
    question:
      "What's the difference between Open Mat and Open Weight Training?",
    answer:
      "Adult Open Mat is BJJ-focused — rolling and drilling. Open Weight Training is a more general training session for adults that can include grappling, conditioning, or technique work depending on who shows up.",
  },
  {
    question: "Is the women's open mat actually women-only?",
    answer:
      "Yes. The Saturday 10:30 AM women's BJJ open mat is a women-only training environment.",
  },
  {
    question: "Do I need to be a certain belt level?",
    answer:
      "No. Our open mat welcomes all belt levels — white through black. Higher belts often help newer practitioners with technique questions, which is part of why open mat exists.",
  },
  {
    question: "What gear do I need?",
    answer:
      "For BJJ open mat: a clean gi (Gi format) or rashguard + shorts (No-Gi format). Mouthguard recommended.",
  },
  {
    question: "How does open mat etiquette work?",
    answer:
      "Standard BJJ etiquette: ask people to roll, tap early, no spazzing, respect injuries. If you're new to open mat culture, our regulars will guide you through.",
  },
];

export const metadata: Metadata = buildClassPageMetadata({
  className: "BJJ Open Mat",
  slug: SLUG,
  title:
    "BJJ Open Mat Chicago | Mission MMA — Friday Open Mat & Women's Open Mat",
  description:
    "Brazilian Jiu-Jitsu (BJJ / jiu-jitsu) open mat in Chicago's West Loop. Friday adult open mat, Saturday women's open mat, plus open weight training. Drop-ins welcome.",
  keywords: [
    "bjj open mat chicago",
    "jiu jitsu open mat chicago",
    "brazilian jiu jitsu open mat chicago",
    "open mat west loop",
    "bjj open mat west loop",
    "womens open mat chicago",
    "bjj rolling chicago",
    "jiu jitsu drop in chicago",
    "open mat near me",
  ],
});

const CONTENT: ClassPageContent = {
  title: "BJJ Open Mat in Chicago — Open Mat at Mission MMA & Fitness",
  dek: "Adult BJJ open mat Fridays at 6:30 PM, women's-only open mat Saturdays at 10:30 AM. Members and visiting grapplers welcome.",
  heroImage:
    "https://images.pexels.com/photos/6253307/pexels-photo-6253307.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroImageAlt: "BJJ open mat rolling at Mission MMA & Fitness",
  slug: SLUG,
  introParagraph:
    "Mission MMA & Fitness runs Brazilian Jiu-Jitsu open mat sessions at 1620 W Carroll Ave in Chicago's West Loop. Our adult BJJ open mat (Friday 6:30 PM) and women's-only jiu jitsu open mat (Saturday 10:30 AM) give grapplers structured time to roll, drill, and train without a formal class agenda. Whether you're a Mission member looking for extra mat time or a visiting BJJ practitioner from another Chicago gym, you're welcome to roll with us.",
  whatYoullLearn: [
    "Unstructured rolling time to apply techniques from your regular classes under live conditions",
    "Exposure to varied partners — different body types, experience levels, and styles",
    "The freedom to focus on specific positions or transitions you want to work on",
  ],
  whoFor: [
    "Mission MMA members looking for extra mat time beyond the regular class schedule",
    "Visiting BJJ practitioners from other Chicago gyms looking for a place to roll",
    "Women grapplers seeking a dedicated women-only rolling session Saturday mornings",
  ],
  qualitySignals: [
    {
      title: "Two Dedicated Open Mat Sessions",
      body: "Adult BJJ open mat on Fridays at 6:30 PM and women's-only open mat Saturdays at 10:30 AM — two distinct sessions each week.",
    },
    {
      title: "All Belt Levels Welcome",
      body: "Open mat at Mission MMA is not exclusive. White belts through black belts share the mat, and more experienced practitioners often help newer ones.",
    },
    {
      title: "Drop-Ins From Other Gyms Welcome",
      body: "Visiting grapplers from other Chicago gyms are welcome. Contact us before your first visit to confirm details and mat fee.",
    },
  ],
  faq: FAQ,
  finalCtaLabel: "Get in Touch About Open Mat",
  finalCtaHref: "/contact",
};

export default function OpenMatPage() {
  return (
    <>
      <JsonLdScript
        data={[
          buildCourse({
            name: "BJJ Open Mat",
            description: CONTENT.introParagraph,
            url: URL,
            alternateNames: [
              "BJJ Open Mat",
              "Jiu Jitsu Open Mat",
              "Brazilian Jiu-Jitsu Open Mat",
            ],
          }),
          buildFaqPage(
            FAQ.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Classes", url: `${GYM.url}/classes` },
            { name: "Open Mat", url: URL },
          ]),
        ]}
      />
      <ClassPageTemplate content={CONTENT} />
    </>
  );
}
