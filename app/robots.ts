import type { MetadataRoute } from "next";

const SITE_URL = "https://missionmmachicago.com";

/**
 * robots.txt — explicitly allow all major AI crawlers in addition to standard search.
 *
 * Why: many gym sites block AI crawlers by default (via opinionated CMS defaults).
 * For a local business trying to be cited in AI Overviews / ChatGPT / Perplexity / Claude,
 * blocking these is self-sabotage. We explicitly welcome them.
 *
 * Disallowed paths:
 * - /api/ — server actions, not for crawling
 * - /free-trial/thank-you — post-conversion page, no SEO value
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/free-trial/thank-you"],
      },
      // Explicit allow list for AI crawlers — same rules as default, just named so they're auditable
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
