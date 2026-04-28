# Conversion Tracking Timing Race

## Problem
The `ConversionTracking` component's `useEffect` ran at React hydration time. The Meta Pixel script uses `<Script strategy="afterInteractive">`, which loads *after* hydration. So `window.fbq` was always `undefined` when the effect ran — the Lead event silently no-oped every time.

## Fix
Replaced the one-shot check with a polling loop (100ms interval, 5s hard timeout). The loop tries to call `fbq("track", "Lead")` and `gtag(...)` on each tick, stops as soon as both fire, and clears itself on unmount or timeout.

## Why It Happened
The original code assumed scripts were ready at mount — a safe assumption for `<Script strategy="beforeInteractive">`, not for `afterInteractive`. The `afterInteractive` strategy defers execution until after the page is interactive (post-hydration), creating a window where `window.fbq` doesn't exist yet.

## Watch For
Any conversion event fired from a `useEffect` on a page that also loads third-party tracking scripts with `strategy="afterInteractive"` or `strategy="lazyOnload"`. The effect always wins the race. Polling (or a `window.fbq` queue pattern) is required.
