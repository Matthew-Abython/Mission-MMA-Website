import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildAggregateRating,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = buildMetadata({
  title: "Reviews · Mission MMA & Fitness Chicago",
  description:
    "See what Chicago martial artists say about Mission MMA & Fitness. 5.0 stars on Google with 200+ reviews. BJJ, Muay Thai, MMA, and kids classes in the West Loop.",
  path: "/reviews",
});

const REVIEWS = [
  {
    name: "Ian S.",
    initials: "IS",
    text: "This is by far the best MMA/kickboxing gym I have ever been to. The spacious, clean, and elegant facility fitted with Yokkao Muay Thai equipment is great! The strength and mobility area with kettlebells and steel maces is fantastic! Coach Said Hatim's kickboxing instruction is world-class.",
  },
  {
    name: "Anish K.",
    initials: "AK",
    text: "Said Hatim is an amazing coach. His instruction style is highly motivating and his technique is unparalleled. I highly recommend Mission MMA for anyone interested in real martial arts — for sports, fitness, and self defense. Top notch facility with awesome instructors and the best equipment money can buy.",
  },
  {
    name: "Mission Member",
    initials: "MM",
    text: "Mission MMA is a great place to learn Muay Thai, BJJ, wrestling, and how to creatively mix techniques together. The coaches possess high-level, practical knowledge which they share in a very welcoming, friendly manner. Teammates feel like an extended family.",
  },
  {
    name: "Corporate Event Guest",
    initials: "CE",
    text: "The instructors here were AMAZING! Very professional, kind, funny, and wonderful to work with. The gym itself was well maintained and very clean. I would highly recommend other companies to schedule team events with Mission MMA.",
  },
  {
    name: "Women's Self-Defense Attendee",
    initials: "WS",
    text: "Mission gave an AMAZING self defense class! We went with a group of coworkers — all females — and the class was extremely informative, practical, and so fun! Each of us left feeling empowered, stronger, and excited to come back. Thank you for a perfect experience!",
  },
  {
    name: "Kids BJJ Parent",
    initials: "KP",
    text: "This is the top jiu-jitsu and MMA gym I have enrolled my son into — and we have been to 4 other gyms. I am overly impressed. The trainers are professional, respectful, and enjoy what they do. Even the other students are good people.",
  },
  {
    name: "Open Mat Drop-in",
    initials: "OM",
    text: "Incredible find! I dropped in while on a work trip to one of their BJJ open mats and had a blast. Staff and students are top notch. Their Muay Thai and jiu-jitsu instructors accommodate all skill levels perfectly.",
  },
  {
    name: "Said Hatim Student",
    initials: "SH",
    text: "Said Hatim is an excellent teacher who genuinely cares about the progress and well-being of his students. He combines fun and creative workouts with world-class instruction and honest, motivating guidance. I would recommend his program to anyone.",
  },
  {
    name: "Chicago Martial Artist",
    initials: "CM",
    text: "This gym has it all — a great, clean, and vibrant environment. The coaches are truly elite. I went to other gyms that had decent coaches but these guys will just keep you hooked. These coaches and members are my family.",
  },
];

export default function ReviewsPage() {
  return (
    <main>
      <JsonLdScript
        data={[
          buildAggregateRating(),
          buildBreadcrumbList([
            { name: "Home", url: GYM.url },
            { name: "Reviews", url: `${GYM.url}/reviews` },
          ]),
        ]}
      />

      {/* Section 1 — Hero stat bar */}
      <section
        className="border-b py-16 text-center"
        style={{
          backgroundColor: "var(--mission-black)",
          borderColor: "rgba(200,16,46,0.3)",
        }}
      >
        <p
          className="font-display leading-none"
          style={{ fontSize: "80px", color: "var(--mission-red)" }}
        >
          5.0 ★
        </p>
        <p
          className="mt-3"
          style={{ fontSize: "20px", color: "var(--mission-gray-300)" }}
        >
          200+ Google Reviews
        </p>
        <p
          className="mt-2"
          style={{ fontSize: "16px", color: "var(--mission-gray-500)" }}
        >
          Chicago&apos;s highest-rated martial arts gym
        </p>
      </section>

      {/* Section 2 — Review cards grid */}
      <section className="px-6 py-20" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="flex flex-col gap-4 rounded-lg p-6"
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(200,16,46,0.2)",
                }}
              >
                {/* Top row: avatar + stars */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "var(--mission-red)" }}
                  >
                    {review.initials}
                  </div>
                  <span className="text-sm text-yellow-400">★★★★★</span>
                </div>

                {/* Quote */}
                <p
                  className="flex-1 italic leading-relaxed"
                  style={{
                    fontSize: "15px",
                    color: "var(--mission-gray-300)",
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer name */}
                <p
                  className="mt-auto font-display uppercase"
                  style={{
                    fontSize: "13px",
                    color: "var(--mission-red)",
                  }}
                >
                  — {review.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Google CTA bar */}
      <section
        className="py-12 text-center"
        style={{ backgroundColor: "var(--mission-black)" }}
      >
        <h2
          className="font-display text-white"
          style={{ fontSize: "28px" }}
        >
          Happy at Mission? Share your experience.
        </h2>
        <p
          className="mt-2"
          style={{ fontSize: "16px", color: "var(--mission-gray-500)" }}
        >
          Reviews help other Chicagoans find us.
        </p>
        <a
          href="#"
          className="mt-6 inline-flex items-center rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors"
          style={{ backgroundColor: "var(--mission-red)" }}
        >
          Write a Google Review →
        </a>
      </section>

      {/* Section 4 — Lead form */}
      <section className="py-16" style={{ backgroundColor: "#111111" }}>
        <h2
          className="mb-8 text-center font-display text-white"
          style={{ fontSize: "32px" }}
        >
          Ready to Start Your Journey?
        </h2>
        <LeadForm source="reviews-page" />
      </section>
    </main>
  );
}
