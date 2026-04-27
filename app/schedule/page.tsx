import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildScheduleEvent,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";
import { WEEKLY_SCHEDULE, totalWeeklyClasses } from "@/lib/schedule";
import { WeeklySchedule } from "@/components/schedule/weekly-schedule";

const URL = `${GYM.url}/schedule`;

export const metadata: Metadata = buildMetadata({
  title: "Weekly Class Schedule — Mission MMA & Fitness Chicago",
  description:
    "30 weekly classes across Brazilian Jiu-Jitsu, Muay Thai, MMA, women's BJJ, kids martial arts, and strength and conditioning at 1620 W Carroll Ave in Chicago's West Loop.",
  path: "/schedule",
  keywords: [
    "martial arts class schedule chicago",
    "bjj schedule chicago",
    "muay thai schedule chicago",
    "mission mma schedule",
  ],
});

const dayNameMap = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
} as const;

export default function SchedulePage() {
  const total = totalWeeklyClasses();

  return (
    <>
      <JsonLdScript
        data={[
          ...WEEKLY_SCHEDULE.map((c) =>
            buildScheduleEvent({
              name: c.name,
              dayOfWeek: dayNameMap[c.day],
              startTime: c.time,
              durationMinutes: c.durationMinutes ?? 60,
              url: `${URL}?discipline=${c.discipline}`,
            }),
          ),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Schedule", url: URL },
          ]),
        ]}
      />

      <main className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h1>Weekly Class Schedule</h1>
          <p className="mt-6 max-w-3xl text-lg text-mission-gray-300 md:text-xl">
            Mission MMA &amp; Fitness offers {total} classes per week across
            Brazilian Jiu-Jitsu, Muay Thai, MMA, women&apos;s BJJ, kids martial
            arts, and strength and conditioning at 1620 W Carroll Ave in
            Chicago&apos;s West Loop. Filter by discipline to see what fits your
            schedule.
          </p>

          <div className="mt-10 md:mt-16">
            {/* useSearchParams requires Suspense boundary in Next.js 15+ */}
            <Suspense
              fallback={
                <div className="text-mission-gray-300">
                  Loading schedule&hellip;
                </div>
              }
            >
              <WeeklySchedule />
            </Suspense>
          </div>

          <div className="mt-16 rounded-lg border border-white/10 bg-mission-gray-900/40 p-6 md:p-8">
            <h2 className="text-2xl">Ready to Train?</h2>
            <p className="mt-3 text-mission-gray-300">
              Your first class is on us. Pick a class that fits your schedule
              and claim a free trial.
            </p>
            <Link
              href="/free-trial"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-mission-red px-8 py-3 text-base font-bold uppercase tracking-wider text-mission-white transition-all duration-300 hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black md:text-lg"
            >
              Claim Your Free Trial
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
