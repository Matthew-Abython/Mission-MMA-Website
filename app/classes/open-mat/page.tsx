import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildCourse,
  buildFaqPage,
  buildBreadcrumbList,
} from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "BJJ Open Mat Chicago | Mission MMA — Friday Open Mat & Women's Open Mat",
  description:
    "Brazilian Jiu-Jitsu (BJJ / jiu-jitsu) open mat in Chicago's West Loop. Friday adult open mat, Saturday women's open mat, plus open weight training. Drop-ins welcome.",
  path: "/classes/open-mat",
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
  absoluteTitle: true,
});

const faqItems = [
  {
    question: "Can I drop in for open mat if I'm not a member?",
    answer:
      "Visitors from other gyms are welcome at our open mat sessions. We ask that you bring your own gear and follow standard BJJ open mat etiquette. Contact us before your first visit so we can confirm details.",
  },
  {
    question: "What's the difference between Open Mat and Open Weight Training?",
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

export default function OpenMatPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <JsonLdScript
        data={[
          buildCourse({
            name: "BJJ Open Mat",
            description:
              "Adult BJJ open mat (Friday 6:30 PM) and women's-only jiu jitsu open mat (Saturday 10:30 AM) at Mission MMA & Fitness in Chicago's West Loop. Drop-ins welcome.",
            url: "https://missionmmachicago.com/classes/open-mat",
          }),
          buildFaqPage(faqItems),
          buildBreadcrumbList([
            { name: "Home", url: "https://missionmmachicago.com" },
            { name: "Classes", url: "https://missionmmachicago.com/classes" },
            { name: "Open Mat", url: "https://missionmmachicago.com/classes/open-mat" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-4xl space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/classes">Classes</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Open Mat</li>
          </ol>
        </nav>
        <h1>BJJ Open Mat in Chicago — Open Mat at Mission MMA &amp; Fitness</h1>
        <p className="text-lg text-muted-foreground">
          Mission MMA &amp; Fitness runs Brazilian Jiu-Jitsu open mat sessions at 1620 W Carroll
          Ave in Chicago&apos;s West Loop. Our adult BJJ open mat (Friday 6:30 PM) and
          women&apos;s-only jiu jitsu open mat (Saturday 10:30 AM) give grapplers structured time
          to roll, drill, and train without a formal class agenda. Whether you&apos;re a Mission
          member looking for extra mat time or a visiting BJJ practitioner from another Chicago
          gym, you&apos;re welcome to roll with us.
        </p>
        <section className="space-y-2">
          <h2>Open Mat Sessions</h2>
          <ul className="space-y-1 text-muted-foreground">
            <li><strong>Friday 6:30 PM</strong> — Adult Open Mat</li>
            <li><strong>Saturday 8:00 AM</strong> — Adult Open Weight Training</li>
            <li><strong>Saturday 10:30 AM</strong> — Women&apos;s Brazilian Jiu Jitsu Open Mat</li>
          </ul>
        </section>
        <p>
          <Link href="/contact" className="font-bold hover:text-mission-red transition-colors">
            Get in touch about open mat →
          </Link>
        </p>
        {/* TODO Phase 2: schedule grid */}
        <section className="space-y-6 pt-4">
          <h2>Frequently Asked Questions</h2>
          {faqItems.map((item, i) => (
            <div key={i} className="space-y-1">
              <h3>{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </section>
        <p className="pt-4 text-sm text-muted-foreground">
          See also:{" "}
          <Link href="/classes/brazilian-jiu-jitsu" className="hover:text-mission-red transition-colors">Brazilian Jiu-Jitsu</Link> ·{" "}
          <Link href="/classes/womens-bjj" className="hover:text-mission-red transition-colors">Women&apos;s BJJ</Link> ·{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">Full Schedule</Link>
        </p>
      </article>
    </main>
  );
}
