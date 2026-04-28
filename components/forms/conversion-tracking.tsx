"use client";

import { useEffect } from "react";

/**
 * Fires conversion tracking pixels on mount.
 * Use ONLY on dedicated thank-you / confirmation pages.
 *
 * Meta Pixel: fires "Lead" standard event when window.fbq becomes available.
 * GA4: fires "generate_lead" event when window.gtag becomes available.
 *
 * Why polling: the Pixel/GA4 scripts use <Script strategy="afterInteractive">,
 * which loads AFTER React hydration completes. This component's useEffect
 * runs at hydration time — before the Pixel script has initialized window.fbq.
 * We poll briefly until each tracker is ready, then fire once.
 *
 * Timeout: if neither tracker loads within 5 seconds, we stop polling.
 * This avoids running forever if a script is blocked by an ad blocker.
 */
export function ConversionTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let firedFbq = false;
    let firedGtag = false;
    const startTime = Date.now();
    const TIMEOUT_MS = 5000;
    const POLL_INTERVAL_MS = 100;

    const tryFire = () => {
      // Meta Pixel
      if (!firedFbq) {
        const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
        if (typeof fbq === "function") {
          fbq("track", "Lead");
          firedFbq = true;
        }
      }

      // GA4
      if (!firedGtag) {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtag === "function") {
          gtag("event", "generate_lead", {
            event_category: "engagement",
            event_label: "free-trial-form",
          });
          firedGtag = true;
        }
      }
    };

    // Try once immediately — covers the case where scripts already loaded
    // (e.g. on browser back/forward navigation)
    tryFire();

    if (firedFbq && firedGtag) return;

    // Otherwise poll until both fire or we time out
    const interval = setInterval(() => {
      tryFire();

      const elapsed = Date.now() - startTime;
      const allFired = firedFbq && firedGtag;
      const timedOut = elapsed >= TIMEOUT_MS;

      if (allFired || timedOut) {
        clearInterval(interval);

        if (timedOut && !firedFbq && process.env.NODE_ENV === "development") {
          console.warn("[ConversionTracking] Meta Pixel did not initialize within 5s");
        }
      }
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}
