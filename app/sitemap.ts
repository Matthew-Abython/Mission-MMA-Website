import type { MetadataRoute } from "next";

const SITE_URL = "https://missionmmachicago.com";

/**
 * Static sitemap. Lists every public, indexable page.
 * Excludes: /free-trial/thank-you (noIndex), /instructors/[slug] (no real bios yet).
 *
 * Update this file when:
 * - New pages are added
 * - Instructor slugs become real (add /instructors/[slug] entries)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/classes", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/classes/brazilian-jiu-jitsu", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/classes/muay-thai", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/classes/mma", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/classes/womens-bjj", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/classes/kids", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/classes/open-mat", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/classes/strength-conditioning", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/schedule", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/instructors", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/free-trial", priority: 0.95, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
