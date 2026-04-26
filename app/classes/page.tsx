import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLdScript, buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Classes & Programs",
  description:
    "Explore martial arts programs at Mission MMA & Fitness in Chicago's West Loop — Brazilian Jiu-Jitsu, Muay Thai, MMA, Women's BJJ, Kids Martial Arts, Open Mat, and Strength & Conditioning.",
  path: "/classes",
  keywords: [
    "martial arts classes chicago",
    "bjj chicago",
    "muay thai chicago",
    "mma classes chicago",
    "kids martial arts chicago",
  ],
});

export default function ClassesPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={buildBreadcrumbList([
          { name: "Home", url: "https://missionmmachicago.com" },
          { name: "Classes", url: "https://missionmmachicago.com/classes" },
        ])}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Classes</li>
          </ol>
        </nav>
        <h1>Our Classes &amp; Programs</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness offers seven martial arts and fitness programs in
          Chicago&apos;s West Loop, from Brazilian Jiu-Jitsu and Muay Thai to a dedicated
          women&apos;s program, kids martial arts, and strength and conditioning. Each class is
          led by coaches with verifiable credentials and real competition experience.
        </p>
        <ul className="space-y-6">
          <li>
            <h2 className="text-xl">
              <Link href="/classes/brazilian-jiu-jitsu" className="hover:text-mission-red transition-colors">
                Brazilian Jiu-Jitsu (BJJ)
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Gi and No-Gi grappling for all levels — 11 classes weekly. Built on the same art
              that defines modern MMA, BJJ rewards leverage and technique over strength.
            </p>
          </li>
          <li>
            <h2 className="text-xl">
              <Link href="/classes/muay-thai" className="hover:text-mission-red transition-colors">
                Muay Thai
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Authentic Thai boxing — fists, elbows, knees, and shins — 9 adult classes weekly
              plus a dedicated sparring class.
            </p>
          </li>
          <li>
            <h2 className="text-xl">
              <Link href="/classes/mma" className="hover:text-mission-red transition-colors">
                MMA
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Mixed martial arts combining BJJ and Muay Thai for beginners through
              competitors. Built on legitimate striking and grappling foundations.
            </p>
          </li>
          <li>
            <h2 className="text-xl">
              <Link href="/classes/womens-bjj" className="hover:text-mission-red transition-colors">
                Women&apos;s Brazilian Jiu-Jitsu
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Women-only BJJ classes plus a women&apos;s open mat — 3 sessions weekly in a
              supportive, women-only environment.
            </p>
          </li>
          <li>
            <h2 className="text-xl">
              <Link href="/classes/kids" className="hover:text-mission-red transition-colors">
                Kids Martial Arts
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Separate Kids Muay Thai and Kids BJJ programs — real technique, age-appropriate
              instruction, 5 classes weekly.
            </p>
          </li>
          <li>
            <h2 className="text-xl">
              <Link href="/classes/open-mat" className="hover:text-mission-red transition-colors">
                Open Mat
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Friday adult open mat and Saturday women&apos;s open mat. Drop-ins from other
              gyms welcome.
            </p>
          </li>
          <li>
            <h2 className="text-xl">
              <Link href="/classes/strength-conditioning" className="hover:text-mission-red transition-colors">
                Strength &amp; Conditioning
              </Link>
            </h2>
            <p className="text-muted-foreground">
              Functional strength and conditioning built for martial artists — 2 sessions weekly,
              beginner-friendly.
            </p>
          </li>
        </ul>
        {/* TODO Phase 2: program grid with images */}
      </article>
    </main>
  );
}
