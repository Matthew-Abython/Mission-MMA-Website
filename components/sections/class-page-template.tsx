import Link from "next/link";
import { GraduationCap, Target, Sparkles, Users, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClassPageHero } from "./class-page-hero";

export interface ClassPageContent {
  title: string;
  dek: string;
  heroImage: string;
  heroImageAlt: string;
  slug: string;
  introParagraph: string;
  whatYoullLearn: string[];
  whoFor: string[];
  qualitySignals: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
  finalCtaLabel: string;
  finalCtaHref: string;
}

export function ClassPageTemplate({ content }: { content: ClassPageContent }) {
  const trialHref = `/free-trial?interest=${content.slug}`;

  return (
    <>
      <ClassPageHero
        image={content.heroImage}
        imageAlt={content.heroImageAlt}
        title={content.title}
        dek={content.dek}
        ctaLabel="Claim Your Free Trial"
        ctaHref={trialHref}
      />

      {/* Intro — entity-dense prose, server-rendered for SEO + AIO */}
      <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-pretty text-lg text-mission-gray-300 md:text-xl">
            {content.introParagraph}
          </p>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2>What You&apos;ll Learn</h2>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.whatYoullLearn.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Target
                  className="mt-1 h-5 w-5 shrink-0 text-mission-red"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-mission-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2>Who This Class Is For</h2>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {content.whoFor.map((persona) => (
              <li
                key={persona}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-mission-gray-900/40 p-5"
              >
                <Users
                  className="mt-0.5 h-5 w-5 shrink-0 text-mission-red"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-mission-white">{persona}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quality signals */}
      <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2>What Sets Our Instruction Apart</h2>
          <p className="mt-4 max-w-3xl text-mission-gray-300">
            Specifics matter. Here&apos;s what makes the difference at Mission
            MMA &amp; Fitness.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {content.qualitySignals.map((signal) => (
              <div key={signal.title} className="flex items-start gap-4">
                <Sparkles
                  className="mt-1 h-6 w-6 shrink-0 text-mission-red"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl uppercase leading-tight text-mission-white">
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-mission-gray-300">{signal.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule placeholder — real WeeklySchedule component added in Step 2.7 */}
      <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2>Class Schedule</h2>
          <p className="mt-4 text-mission-gray-300">
            See the full weekly schedule and find a class that fits your day.
          </p>
          <div className="mt-8">
            <Link
              href={`/schedule?discipline=${content.slug}`}
              className="inline-flex items-center gap-2 rounded-md border border-mission-red bg-transparent px-6 py-3 font-bold uppercase tracking-wider text-mission-red transition-all duration-300 hover:bg-mission-red hover:text-mission-white"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              View Full Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2>Frequently Asked Questions</h2>
          <Accordion className="mt-8">
            {content.faq.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display uppercase text-mission-white hover:text-mission-red">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-mission-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2>
            <GraduationCap
              className="mx-auto mb-4 h-12 w-12 text-mission-red"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Ready to Start?
          </h2>
          <p className="mt-4 text-mission-gray-300">
            Your first class is on us. No commitment, no pressure — just come
            train.
          </p>
          <Link
            href={content.finalCtaHref}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-mission-red px-10 py-4 text-base font-bold uppercase tracking-wider text-mission-white transition-all duration-300 hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black md:text-lg"
          >
            {content.finalCtaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
