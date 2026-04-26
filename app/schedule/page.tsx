import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildScheduleEvent, buildBreadcrumbList, GYM } from "@/lib/schema";
import {
  WEEKLY_SCHEDULE,
  DAYS_OF_WEEK,
  DAY_LABELS,
  classesByDay,
  type Discipline,
} from "@/lib/schedule";
import type { ScheduleEventInput } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Weekly Class Schedule",
  description:
    "Mission MMA & Fitness weekly class schedule — 30 classes per week across Brazilian Jiu-Jitsu, Muay Thai, MMA, Women's BJJ, Kids Martial Arts, and Strength & Conditioning in Chicago's West Loop.",
  path: "/schedule",
  keywords: [
    "martial arts class schedule chicago",
    "bjj class schedule chicago",
    "muay thai class schedule chicago",
    "west loop martial arts schedule",
  ],
});

const DISCIPLINE_URLS: Record<Discipline, string> = {
  "muay-thai": `${GYM.url}/classes/muay-thai`,
  "bjj-no-gi": `${GYM.url}/classes/brazilian-jiu-jitsu`,
  "bjj-gi": `${GYM.url}/classes/brazilian-jiu-jitsu`,
  "womens-bjj": `${GYM.url}/classes/womens-bjj`,
  "kids-muay-thai": `${GYM.url}/classes/kids`,
  "kids-bjj": `${GYM.url}/classes/kids`,
  "strength": `${GYM.url}/classes/strength-conditioning`,
  "open-mat": `${GYM.url}/classes/open-mat`,
  "sparring": `${GYM.url}/classes/muay-thai`,
  "open-weight": `${GYM.url}/classes/open-mat`,
};

const scheduleEvents = WEEKLY_SCHEDULE.map((cls) =>
  buildScheduleEvent({
    name: cls.name,
    dayOfWeek: (cls.day.charAt(0).toUpperCase() + cls.day.slice(1)) as ScheduleEventInput["dayOfWeek"],
    startTime: cls.time,
    durationMinutes: cls.durationMinutes ?? 60,
    url: DISCIPLINE_URLS[cls.discipline],
  })
);

export default function SchedulePage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          ...scheduleEvents,
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Schedule", url: "https://missionmmachicago.com/schedule" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Schedule</li>
          </ol>
        </nav>
        <h1>Weekly Class Schedule</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers 30 classes per week across Brazilian Jiu-Jitsu, Muay
          Thai, MMA, women&apos;s BJJ, kids martial arts, and strength and conditioning at 1620 W
          Carroll Ave in Chicago&apos;s West Loop.
        </p>
        {DAYS_OF_WEEK.map((day) => {
          const classes = classesByDay(day);
          if (classes.length === 0) return null;
          return (
            <section key={day}>
              <h2>{DAY_LABELS[day]}</h2>
              <ul className="mt-2 space-y-1">
                {classes.map((cls, i) => (
                  <li key={i} className="text-muted-foreground">
                    <span className="font-medium text-foreground">{cls.displayTime}</span>
                    {" — "}
                    {cls.name}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="pt-4 text-sm text-muted-foreground">
          Sunday — no scheduled classes.
        </p>
        {/* TODO Phase 2: interactive WeeklySchedule component with filters */}
        <p className="pt-2">
          <Link href="/free-trial" className="font-bold hover:text-mission-red transition-colors">
            Claim your free trial class →
          </Link>
        </p>
      </article>
    </main>
  );
}
