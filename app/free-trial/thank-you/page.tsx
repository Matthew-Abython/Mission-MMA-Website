import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageSquare, Calendar } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ConversionTracking } from "@/components/forms/conversion-tracking";

export const metadata: Metadata = buildMetadata({
  title: "Thanks — We'll Be in Touch | Mission MMA & Fitness",
  description:
    "Thanks for reaching out to Mission MMA & Fitness. A coach will text or call you within 24 hours to schedule your free class.",
  path: "/free-trial/thank-you",
  noIndex: true,
  absoluteTitle: true,
});

export default function ThankYouPage() {
  return (
    <>
      {/* Fires Meta Pixel + GA4 conversion events on mount (client-side only) */}
      <ConversionTracking />

      <main>
        <section className="bg-mission-black px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mission-red/10 text-mission-red">
                <CheckCircle2
                  className="h-12 w-12"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="mt-8">Thanks — We&apos;ll Be in Touch</h1>

            <p className="mt-6 text-lg text-mission-gray-300 md:text-xl">
              Your free trial request was received. A coach will text or call
              you within 24 hours to confirm a class time.
            </p>
          </div>
        </section>

        <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center">What Happens Next</h2>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-mission-red/10 text-mission-red">
                  <MessageSquare
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg uppercase text-mission-white">
                  We Reach Out
                </h3>
                <p className="mt-2 text-sm text-mission-gray-300">
                  Within 24 hours, a coach will text or call to answer questions
                  and confirm your class time.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-mission-red/10 text-mission-red">
                  <Calendar
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg uppercase text-mission-white">
                  Pick a Class
                </h3>
                <p className="mt-2 text-sm text-mission-gray-300">
                  Choose any class on our schedule that fits your week. Your
                  first class is on us.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-mission-red/10 text-mission-red">
                  <CheckCircle2
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg uppercase text-mission-white">
                  Come Train
                </h3>
                <p className="mt-2 text-sm text-mission-gray-300">
                  Wear athletic clothes, arrive 10 minutes early, bring a water
                  bottle. We&apos;ll handle the rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2>While You Wait</h2>
            <p className="mt-4 text-mission-gray-300">
              Take a look at our weekly schedule, browse our programs, or check
              out the gym story.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center rounded-md border border-mission-red bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wider text-mission-red transition-all duration-300 hover:bg-mission-red hover:text-mission-white md:text-base"
              >
                See Schedule
              </Link>
              <Link
                href="/classes"
                className="inline-flex items-center justify-center rounded-md border border-white/10 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wider text-mission-gray-300 transition-all duration-300 hover:border-white/30 hover:text-mission-white md:text-base"
              >
                Browse Programs
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-white/10 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wider text-mission-gray-300 transition-all duration-300 hover:border-white/30 hover:text-mission-white md:text-base"
              >
                About Mission
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
