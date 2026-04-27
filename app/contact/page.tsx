import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildLocalBusiness,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";
import {
  WEEKLY_SCHEDULE,
  DAYS_OF_WEEK,
  DAY_LABELS,
  type DayOfWeek,
} from "@/lib/schedule";

const URL = `${GYM.url}/contact`;

export const metadata: Metadata = buildMetadata({
  title: "Contact Mission MMA & Fitness — Visit Our West Loop Chicago Gym",
  description:
    "Visit Mission MMA & Fitness at 1620 W Carroll Ave in Chicago's West Loop. Phone 312-265-1856, email info@missionmmachicago.com. Free trial class available — open Monday through Saturday.",
  path: "/contact",
  keywords: [
    "contact mission mma chicago",
    "mission mma address",
    "martial arts gym west loop contact",
    "bjj gym chicago contact",
  ],
});

function deriveHours(): { day: DayOfWeek; label: string; hours: string }[] {
  return DAYS_OF_WEEK.map((day) => {
    const classes = WEEKLY_SCHEDULE.filter((c) => c.day === day).sort((a, b) =>
      a.time.localeCompare(b.time),
    );
    if (classes.length === 0) {
      return { day, label: DAY_LABELS[day], hours: "Closed" };
    }
    const first = classes[0];
    const last = classes[classes.length - 1];
    const [lastH, lastM] = last.time.split(":").map((n) => parseInt(n, 10));
    const lastEndMinutes = lastH * 60 + lastM + (last.durationMinutes ?? 60);
    const lastEndHour = Math.floor(lastEndMinutes / 60);
    const lastEndMin = lastEndMinutes % 60;
    const formatTime = (h: number, m: number) => {
      const period = h >= 12 ? "PM" : "AM";
      const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
    };
    const [firstH, firstM] = first.time.split(":").map((n) => parseInt(n, 10));
    return {
      day,
      label: DAY_LABELS[day],
      hours: `${formatTime(firstH, firstM)} – ${formatTime(lastEndHour, lastEndMin)}`,
    };
  });
}

export default function ContactPage() {
  const hours = deriveHours();
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    "Mission MMA & Fitness, 1620 W Carroll Ave, Chicago, IL 60612",
  )}&output=embed`;

  return (
    <>
      <JsonLdScript
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Contact", url: URL },
          ]),
        ]}
      />

      <main>
        {/* Hero strip */}
        <section className="bg-mission-black px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h1>Visit Mission MMA &amp; Fitness</h1>
            <p className="mt-6 max-w-2xl text-lg text-mission-gray-300 md:text-xl">
              We&apos;re at 1620 W Carroll Ave in Chicago&apos;s West Loop.
              Walk-in tours welcome during open hours, or text ahead to
              coordinate.
            </p>
          </div>
        </section>

        {/* Contact details + map */}
        <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Details */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin
                  className="mt-1 h-6 w-6 shrink-0 text-mission-red"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-display text-xl uppercase text-mission-white md:text-2xl">
                    Address
                  </h2>
                  <address className="mt-2 not-italic text-mission-gray-300">
                    1620 W Carroll Ave
                    <br />
                    Chicago, IL 60612
                  </address>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Mission+MMA+%26+Fitness%2C+1620+W+Carroll+Ave%2C+Chicago%2C+IL+60612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-mission-red underline decoration-2 underline-offset-4 hover:text-mission-white"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  className="mt-1 h-6 w-6 shrink-0 text-mission-red"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-display text-xl uppercase text-mission-white md:text-2xl">
                    Phone
                  </h2>
                  <p className="mt-2">
                    <a
                      href={`tel:${GYM.telephone}`}
                      className="text-mission-gray-300 hover:text-mission-white"
                    >
                      312-265-1856
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail
                  className="mt-1 h-6 w-6 shrink-0 text-mission-red"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-display text-xl uppercase text-mission-white md:text-2xl">
                    Email
                  </h2>
                  <p className="mt-2">
                    <a
                      href={`mailto:${GYM.email}`}
                      className="text-mission-gray-300 hover:text-mission-white"
                    >
                      {GYM.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock
                  className="mt-1 h-6 w-6 shrink-0 text-mission-red"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="w-full">
                  <h2 className="font-display text-xl uppercase text-mission-white md:text-2xl">
                    Hours
                  </h2>
                  <p className="mt-1 text-sm text-mission-gray-500">
                    First class through last class. Tours welcome during open
                    hours.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-mission-gray-300">
                    {hours.map((h) => (
                      <li key={h.day} className="flex items-baseline gap-3">
                        <span className="w-24 font-medium text-mission-white">
                          {h.label}
                        </span>
                        <span
                          className={
                            h.hours === "Closed"
                              ? "italic text-mission-gray-500"
                              : ""
                          }
                        >
                          {h.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg border border-white/10 bg-mission-black">
              <iframe
                src={mapsEmbedUrl}
                className="h-[400px] w-full lg:h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mission MMA & Fitness location map"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-mission-gray-300">
            <h2>What to Expect on Your First Visit</h2>
            <p>
              When you arrive at Mission MMA, you&apos;ll be greeted by a coach
              or front desk member. We&apos;ll show you around the facility,
              answer any questions about the program you&apos;re interested in,
              and get you on the mat for your free trial class.
            </p>
            <p>
              Wear comfortable athletic clothes for your first class. For
              Brazilian Jiu-Jitsu, bring a Gi if you have one — or athletic
              shorts and a rash guard for No-Gi. For Muay Thai, athletic clothes
              are fine; we have hand wraps and gloves available for trial. For
              Strength &amp; Conditioning, standard gym attire works.
            </p>
            <p>
              Plan to arrive 10 minutes before class starts so you have time for
              a quick orientation. Bring a water bottle. Don&apos;t worry about
              experience level — every class welcomes complete beginners.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2>Ready to Train?</h2>
            <p className="mt-4 text-mission-gray-300">
              Your first class is free. Pick a class on our schedule, then claim
              your trial.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/free-trial"
                className="inline-flex items-center justify-center rounded-md bg-mission-red px-8 py-3.5 text-base font-bold uppercase tracking-wider text-mission-white transition-all duration-300 hover:bg-mission-red-dark hover:shadow-[0_8px_32px_rgba(200,16,46,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black md:text-lg"
              >
                Claim Free Trial
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center rounded-md border border-mission-red bg-transparent px-8 py-3.5 text-base font-bold uppercase tracking-wider text-mission-red transition-all duration-300 hover:bg-mission-red hover:text-mission-white"
              >
                See Schedule
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
