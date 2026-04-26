import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildLocalBusiness, buildBreadcrumbList, GYM } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Visit Mission MMA & Fitness — Chicago West Loop",
  description:
    "Contact Mission MMA & Fitness in Chicago's West Loop. Call, email, or visit us at 1620 W Carroll Ave, Chicago, IL 60612. Free trial class available.",
  path: "/contact",
  keywords: [
    "contact mission mma chicago",
    "martial arts gym west loop address",
    "mission mma address chicago",
  ],
  absoluteTitle: true,
});

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildLocalBusiness(),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Contact", url: "https://missionmmachicago.com/contact" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Contact</li>
          </ol>
        </nav>
        <h1>Visit Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness is located at{" "}
          <strong>1620 W Carroll Ave, Chicago, IL 60612</strong> in the West Loop neighborhood,
          minutes from Fulton Market and the United Center. Reach us by phone at{" "}
          <a href={`tel:${GYM.telephone}`} className="hover:text-mission-red transition-colors">
            (312) 265-1856
          </a>{" "}
          or by email at{" "}
          <a href={`mailto:${GYM.email}`} className="hover:text-mission-red transition-colors">
            {GYM.email}
          </a>
          .
        </p>
        <section className="space-y-3">
          <h2>Contact Information</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Address:</strong>{" "}
              1620 W Carroll Ave, Chicago, IL 60612
            </li>
            <li>
              <strong className="text-foreground">Phone:</strong>{" "}
              <a href={`tel:${GYM.telephone}`} className="hover:text-mission-red transition-colors">
                (312) 265-1856
              </a>
            </li>
            <li>
              <strong className="text-foreground">Email:</strong>{" "}
              <a href={`mailto:${GYM.email}`} className="hover:text-mission-red transition-colors">
                {GYM.email}
              </a>
            </li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2>Class Hours</h2>
          <p className="text-muted-foreground">
            Classes run Monday through Saturday. Early morning sessions start at 6:00 AM;
            evening classes run until 8:30 PM. See the{" "}
            <Link href="/schedule" className="hover:text-mission-red transition-colors">
              full weekly schedule
            </Link>{" "}
            for exact times by day.
          </p>
        </section>
        {/* TODO Phase 3: contact form, map embed */}
        <p>
          <Link href="/free-trial" className="font-bold hover:text-mission-red transition-colors">
            Claim your free trial class →
          </Link>
        </p>
      </article>
    </main>
  );
}
