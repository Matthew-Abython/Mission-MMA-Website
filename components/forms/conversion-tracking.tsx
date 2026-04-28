"use client";

import { useEffect } from "react";

/**
 * Fires conversion tracking pixels on mount.
 * Use ONLY on dedicated thank-you / confirmation pages.
 *
 * Meta Pixel: fires "Lead" standard event with optional value/currency.
 * GA4: fires "generate_lead" event if NEXT_PUBLIC_GA4_ID is configured.
 *
 * The Pixel ID is hardcoded via process.env at build time; if you change
 * the Pixel ID, redeploy.
 */
export function ConversionTracking() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Meta Pixel — only fires if window.fbq has been initialized
      const fbq = (
        window as unknown as { fbq?: (...args: unknown[]) => void }
      ).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Lead");
      }

      // GA4 — fires if window.gtag has been initialized
      const gtag = (
        window as unknown as { gtag?: (...args: unknown[]) => void }
      ).gtag;
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: "free-trial-form",
        });
      }
    }
  }, []);

  return null;
}
