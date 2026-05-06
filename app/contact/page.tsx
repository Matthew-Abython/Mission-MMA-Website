import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Car, Bus, Train, MessageSquare } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildLocalBusiness,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";

const URL = `${GYM.url}/contact`;

// Official business hours (source: Yelp listing — distinct from class schedule)
const CONTACT_HOURS = [
  { label: "Monday",    hours: "9:00 AM – 8:30 PM" },
  { label: "Tuesday",   hours: "6:30 AM – 8:30 PM" },
  { label: "Wednesday", hours: "6:00 AM – 8:30 PM" },
  { label: "Thursday",  hours: "7:00 AM – 8:30 PM" },
  { label: "Friday",    hours: "7:00 AM – 7:30 PM" },
  { label: "Saturday",  hours: "7:00 AM – 2:00 PM" },
  { label: "Sunday",    hours: "Closed" },
];

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

export default function ContactPage() {
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
                    {CONTACT_HOURS.map((h) => (
                      <li key={h.label} className="flex items-baseline gap-3">
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

        {/* Getting Here */}
        <section className="bg-mission-black px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h2
              className="font-display uppercase text-white mb-6"
              style={{ fontSize: "24px" }}
            >
              Getting Here
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Parking */}
              <div className="flex flex-col gap-2 rounded-lg p-5" style={{ backgroundColor: "#1A1A1A" }}>
                <Car className="h-5 w-5" style={{ color: "var(--mission-red)" }} aria-hidden="true" />
                <p className="font-display uppercase text-white" style={{ fontSize: "16px" }}>
                  Free Street Parking
                </p>
                <p style={{ fontSize: "14px", color: "var(--mission-gray-300)" }}>
                  Parking available directly outside the building.
                </p>
              </div>

              {/* Bus */}
              <div className="flex flex-col gap-2 rounded-lg p-5" style={{ backgroundColor: "#1A1A1A" }}>
                <Bus className="h-5 w-5" style={{ color: "var(--mission-red)" }} aria-hidden="true" />
                <p className="font-display uppercase text-white" style={{ fontSize: "16px" }}>
                  Ashland Bus (Route 9)
                </p>
                <p style={{ fontSize: "14px", color: "var(--mission-gray-300)" }}>
                  2-minute walk from the stop.
                </p>
              </div>

              {/* Train */}
              <div className="flex flex-col gap-2 rounded-lg p-5" style={{ backgroundColor: "#1A1A1A" }}>
                <Train className="h-5 w-5" style={{ color: "var(--mission-red)" }} aria-hidden="true" />
                <p className="font-display uppercase text-white" style={{ fontSize: "16px" }}>
                  Green/Pink Line CTA
                </p>
                <p style={{ fontSize: "14px", color: "var(--mission-gray-300)" }}>
                  3-minute walk from the station.
                </p>
              </div>

              {/* Text or Call */}
              <div className="flex flex-col gap-2 rounded-lg p-5" style={{ backgroundColor: "#1A1A1A" }}>
                <MessageSquare className="h-5 w-5" style={{ color: "var(--mission-red)" }} aria-hidden="true" />
                <p className="font-display uppercase text-white" style={{ fontSize: "16px" }}>
                  Text or Call
                </p>
                <p style={{ fontSize: "14px", color: "var(--mission-gray-300)" }}>
                  SMS:{" "}
                  <a
                    href="sms:+17736099133"
                    className="hover:underline"
                    style={{ color: "var(--mission-red)" }}
                  >
                    (773) 609-9133
                  </a>
                  <br />
                  Live line 4:30–9:30pm:{" "}
                  <a
                    href="tel:+13122852423"
                    className="hover:underline"
                    style={{ color: "var(--mission-red)" }}
                  >
                    (312) 285-2423
                  </a>
                </p>
              </div>
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

        {/* Contact form */}
        <section className="bg-mission-gray-900 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            {/* Group / corporate events callout */}
            <div
              className="rounded-r-lg p-6 my-8"
              style={{
                borderLeft: "4px solid var(--mission-red)",
                backgroundColor: "#1A1A1A",
              }}
            >
              <h3
                className="font-display uppercase text-white mb-2"
                style={{ fontSize: "20px" }}
              >
                Corporate &amp; Group Events
              </h3>
              <p
                className="leading-relaxed mb-4"
                style={{ fontSize: "14px", color: "var(--mission-gray-300)" }}
              >
                Mission MMA offers private self-defense workshops, team-building
                sessions, and women&apos;s empowerment classes for companies
                across Chicago. Our instructors bring professional, fun, and
                practical instruction to groups of any size — no experience
                necessary.
              </p>
              <a
                href="mailto:info@missionmmachicago.com"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--mission-red)" }}
              >
                Inquire about group events →
              </a>
            </div>

            <div className="rounded-lg border border-white/10 bg-mission-black/60 p-6 md:p-10">
              <h2>Send a Quick Message</h2>
              <p className="mt-3 text-mission-gray-300">
                Drop your info and we&apos;ll get back to you. For immediate
                questions, call{" "}
                <a
                  href="tel:+13122651856"
                  className="text-mission-red hover:text-mission-white"
                >
                  312-265-1856
                </a>
                .
              </p>
              <div className="mt-8 max-w-md">
                <LeadForm source="contact" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-mission-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2>Ready to Train?</h2>
            <p className="mt-4 text-mission-gray-300">
              Your first class is free. Pick a class on our schedule, then claim
              your trial.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book"
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
