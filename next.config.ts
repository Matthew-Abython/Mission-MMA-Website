import type { NextConfig } from "next";

/**
 * 301 redirects from the legacy 97Display site URLs to the new structure.
 * Source of truth: docs/redirect-map.csv.
 *
 * Rationale: anyone clicking an old URL from Google's index, an old social
 * media post, an emailed link, or a saved bookmark gets routed to the
 * correct new page instead of a 404. This preserves ~5 years of accumulated
 * backlinks and ranking signals.
 *
 * `permanent: true` => 308 (Moved Permanently). Browsers and search engines
 * cache these aggressively. Triple-check before changing once we're live.
 */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "missionmmachicago.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      // Retire /free-trial as an entry point — /book is now canonical.
      { source: "/free-trial", destination: "/book", permanent: true },
      { source: "/free-trial/thank-you", destination: "/book", permanent: true },

      // Class pages — old capitalized hyphenated URLs to new lowercase slugs.
      // Note: /classes/Brazilian-Jiu-Jitsu, /classes/MMA, and /Contact are
      // handled in middleware.ts — Next.js redirect matching is case-insensitive
      // and those three sources would self-redirect their own destination URL.
      {
        source: "/classes/Muay-Thai-Kickboxing",
        destination: "/classes/muay-thai",
        permanent: true,
      },
      {
        source: "/classes/Kids-Jiu-Jitsu",
        destination: "/classes/kids",
        permanent: true,
      },
      {
        source: "/classes/Kids-Muay-Thai",
        destination: "/classes/kids",
        permanent: true,
      },
      {
        source: "/classes/Womens-Brazilian-Jiu-Jitsu",
        destination: "/classes/womens-bjj",
        permanent: true,
      },
      {
        source: "/classes/Fitness",
        destination: "/classes/strength-conditioning",
        permanent: true,
      },
      {
        source: "/classes/Private-Lessons",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/classes/Mission-Empower",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/classes/Training-with-Head-Coach",
        destination: "/contact",
        permanent: true,
      },

      // Top-level legacy paths
      {
        source: "/Home/Schedule",
        destination: "/schedule",
        permanent: true,
      },
      {
        source: "/Home/Reviews",
        destination: "/reviews",
        permanent: true,
      },
      {
        source: "/FAQ",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Home/Offer",
        destination: "/free-trial",
        permanent: true,
      },
      {
        source: "/Home/Offer/9389",
        destination: "/free-trial?interest=brazilian-jiu-jitsu",
        permanent: true,
      },
      {
        source: "/Home/Offer/9390",
        destination: "/free-trial?interest=muay-thai",
        permanent: true,
      },
      {
        source: "/Gallery",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
