import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { JsonLdScript, buildFaqPage } from "@/lib/schema";
import { FaqSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "FAQ | Mission MMA & Fitness Chicago",
  description:
    "Answers to common questions about BJJ, Muay Thai, MMA, kids classes, membership, and training at Mission MMA in Chicago's West Loop.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLdScript data={buildFaqPage(FAQ_ITEMS)} />
      <FaqSection items={FAQ_ITEMS} />
    </>
  );
}
