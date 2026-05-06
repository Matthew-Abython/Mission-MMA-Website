import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  JsonLdScript,
  buildAggregateRating,
  buildBreadcrumbList,
  GYM,
} from "@/lib/schema";
import { LeadForm } from "@/components/forms/lead-form";
import { TESTIMONIALS } from "@/lib/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Reviews · Mission MMA & Fitness Chicago",
  description:
    "See what Chicago martial artists say about Mission MMA & Fitness. 5.0 stars on Google with 200+ reviews. BJJ, Muay Thai, MMA, and kids classes in the West Loop.",
  path: "/reviews",
});

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
            {TESTIMONIALS.map((review) => (
              <article
                key={review.id}
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
