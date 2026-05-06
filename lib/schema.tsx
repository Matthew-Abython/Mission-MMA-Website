/**
 * JSON-LD schema builders for Mission MMA & Fitness.
 *
 * Every public-facing page should emit at least one of these structured
 * data blobs via a <script type="application/ld+json"> tag in the
 * server-rendered HTML. See docs/AIO-PLAYBOOK.md for the strategy
 * behind why each schema type matters for SEO and LLM citations.
 *
 * Usage:
 *   import { buildLocalBusiness, JsonLdScript } from "@/lib/schema";
 *   <JsonLdScript data={buildLocalBusiness()} />
 */

// ─────────────────────────────────────────────────────────
// Constants — single source of truth for gym identity
// ─────────────────────────────────────────────────────────

export const GYM = {
  name: "Mission MMA & Fitness",
  legalName: "Mission MMA & Fitness",
  description:
    "Mission MMA & Fitness is a 4,500 sq ft martial arts academy established in 2016 in Chicago's West Loop, training on world-class Yokkao Muay Thai equipment with free street parking and steps from the Green/Pink Line CTA.",
  url: "https://missionmmachicago.com",
  logo: "https://missionmmachicago.com/missionmmalogo2.png",
  image: "https://missionmmachicago.com/opengraph-image",
  telephone: "+1-312-265-1856",
  email: "info@missionmmachicago.com",
  address: {
    streetAddress: "1620 W Carroll Ave",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60612",
    addressCountry: "US",
  },
  geo: {
    latitude: 41.8876,
    longitude: -87.6651,
  },
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/MissionMMAchicago",
    "https://www.instagram.com/missionmmachi",
    "https://x.com/MissionMMAChi",
    "https://www.youtube.com/channel/UCfPaDzFvM5dpNllcSno5LXg",
  ],
} as const;

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

type JsonLd = Record<string, unknown>;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface InstructorInput {
  name: string;
  slug: string;
  jobTitle: string;          // e.g. "Head BJJ Coach"
  bio: string;               // 1–2 sentence summary
  image?: string;            // absolute URL
  beltRank?: string;         // e.g. "Brazilian Jiu-Jitsu Black Belt"
  lineage?: string;          // e.g. "Black belt under Professor X"
  yearsTraining?: number;
  competitionRecord?: string;
  sameAs?: string[];         // social profiles
}

export interface CourseInput {
  name: string;              // e.g. "Brazilian Jiu-Jitsu"
  description: string;
  url: string;               // absolute URL of the class page
  alternateNames?: string[]; // e.g. ["BJJ", "Jiu Jitsu", "Jiu-Jitsu"]
}

export interface ScheduleEventInput {
  name: string;              // e.g. "Adult Brazilian Jiu Jitsu (No Gi)"
  dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  startTime: string;         // HH:MM (24h)
  durationMinutes?: number;  // default 60
  url: string;               // absolute URL of class page
  description?: string;
}

export interface ReviewInput {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  datePublished?: string;    // ISO date
}

// ─────────────────────────────────────────────────────────
// Builders
// ─────────────────────────────────────────────────────────

/**
 * The site-wide gym identity. Emit on EVERY page in the root layout.
 * Combines LocalBusiness + MartialArtsSchool so we appear in both
 * generic local-business and martial-arts-specific search contexts.
 */
export function buildLocalBusiness(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MartialArtsSchool"],
    "@id": `${GYM.url}/#gym`,
    name: GYM.name,
    legalName: GYM.legalName,
    description: GYM.description,
    url: GYM.url,
    logo: GYM.logo,
    image: GYM.image,
    telephone: GYM.telephone,
    email: GYM.email,
    address: {
      "@type": "PostalAddress",
      ...GYM.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...GYM.geo,
    },
    priceRange: GYM.priceRange,
    foundingDate: "2016",
    sameAs: [...GYM.sameAs],
    areaServed: {
      "@type": "City",
      name: "Chicago",
    },
  };
}

/**
 * Course schema for a class/discipline page.
 * Pair with buildFaqPage and buildBreadcrumbList on the same page.
 */
export function buildCourse(input: CourseInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.alternateNames && input.alternateNames.length > 0
      ? { alternateName: input.alternateNames }
      : {}),
    provider: {
      "@type": ["LocalBusiness", "MartialArtsSchool"],
      "@id": `${GYM.url}/#gym`,
      name: GYM.name,
      url: GYM.url,
    },
    inLanguage: "en-US",
    educationalLevel: "Beginner to Advanced",
    teaches: input.name,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "in-person",
      location: {
        "@type": "Place",
        name: GYM.name,
        address: {
          "@type": "PostalAddress",
          ...GYM.address,
        },
      },
    },
  };
}

/**
 * FAQPage schema. Emit on every class page with that page's FAQs.
 * LLMs quote these answers verbatim in AI Overviews.
 */
export function buildFaqPage(items: FAQItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema. Emit on every page that isn't the home page.
 * Items should be ordered from home → leaf, e.g.:
 *   [{ name: "Home", url: "https://..." },
 *    { name: "Classes", url: "https://.../classes" },
 *    { name: "BJJ", url: "https://.../classes/brazilian-jiu-jitsu" }]
 */
export function buildBreadcrumbList(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Person schema for an instructor. Emit on each instructor's detail page.
 * Lineage and credentials are critical AIO signals — fill them in fully.
 */
export function buildPerson(input: InstructorInput): JsonLd {
  const detailUrl = `${GYM.url}/instructors/${input.slug}`;
  const description = [
    input.bio,
    input.beltRank ? `Belt rank: ${input.beltRank}.` : null,
    input.lineage ? `Lineage: ${input.lineage}.` : null,
    typeof input.yearsTraining === "number"
      ? `Training since ${new Date().getFullYear() - input.yearsTraining}.`
      : null,
    input.competitionRecord ? `Competition: ${input.competitionRecord}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${detailUrl}#person`,
    name: input.name,
    jobTitle: input.jobTitle,
    description,
    url: detailUrl,
    ...(input.image ? { image: input.image } : {}),
    ...(input.sameAs && input.sameAs.length > 0
      ? { sameAs: input.sameAs }
      : {}),
    worksFor: {
      "@type": ["LocalBusiness", "MartialArtsSchool"],
      "@id": `${GYM.url}/#gym`,
      name: GYM.name,
      url: GYM.url,
    },
  };
}

/**
 * Event schema for a single recurring class. The schedule page emits one
 * of these per scheduled class. We use eventSchedule.byDay for recurrence
 * so search engines understand it's a weekly recurring event, not a
 * single occurrence.
 */
export function buildScheduleEvent(input: ScheduleEventInput): JsonLd {
  const duration = input.durationMinutes ?? 60;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description ?? `${input.name} at ${GYM.name}`,
    url: input.url,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: GYM.name,
      address: {
        "@type": "PostalAddress",
        ...GYM.address,
      },
    },
    organizer: {
      "@type": ["LocalBusiness", "MartialArtsSchool"],
      "@id": `${GYM.url}/#gym`,
      name: GYM.name,
      url: GYM.url,
    },
    eventSchedule: {
      "@type": "Schedule",
      byDay: `https://schema.org/${input.dayOfWeek}`,
      startTime: input.startTime,
      duration: `PT${duration}M`,
      repeatFrequency: "P1W",
    },
  };
}

/**
 * AggregateRating + Review block. Use on home and reviews-heavy pages.
 * Reviews are 1–5 star and tied to the gym entity.
 */
export function buildAggregateRatingWithReviews(
  reviews: ReviewInput[],
): JsonLd {
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = reviews.length > 0 ? totalRating / reviews.length : 0;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MartialArtsSchool"],
    "@id": `${GYM.url}/#gym`,
    name: GYM.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body,
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    })),
  };
}

/**
 * Standalone AggregateRating for the /reviews page.
 * Uses itemReviewed to associate the rating with the gym entity.
 */
export function buildAggregateRating(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "MartialArtsSchool",
      name: "Mission MMA & Fitness",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1620 W Carroll Ave",
        addressLocality: "Chicago",
        addressRegion: "IL",
        postalCode: "60612",
      },
    },
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "103",
  };
}

// ─────────────────────────────────────────────────────────
// Renderer component
// ─────────────────────────────────────────────────────────

/**
 * Renders one or more JSON-LD blobs as <script> tags.
 * Always render server-side — schema in client-rendered components
 * is invisible to LLM crawlers.
 *
 * Usage:
 *   <JsonLdScript data={buildLocalBusiness()} />
 *   <JsonLdScript data={[buildCourse(...), buildFaqPage(...)]} />
 */
export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }) {
  const blobs = Array.isArray(data) ? data : [data];
  return (
    <>
      {blobs.map((blob, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify safely escapes for script tag context
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blob) }}
        />
      ))}
    </>
  );
}
