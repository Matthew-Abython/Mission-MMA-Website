# Lesson: Inline Portrait Video Player — /about Facility Section

**Date:** 2026-05-11 (Phase 2)

---

## Why contained portrait vs. full-bleed background

All three video assets are portrait orientation (720×1280, 9:16). A full-bleed landscape hero requires wide footage — portrait video crops to a thin center strip when used as a `background-video`, losing context and looking broken on desktop. The decision to place walkthrough video inside a contained, centered portrait player lets the 9:16 aspect ratio work *with* the footage instead of fighting it.

## IntersectionObserver threshold 0.4

Threshold 0.4 means autoplay fires only when at least 40% of the video element is in the viewport. Lower thresholds (e.g. 0.1) trigger too early — the video starts playing before the user has consciously scrolled to it, causing an audible/visible surprise. Higher thresholds (0.6+) delay autoplay to the point where the user can see the static poster too long. 0.4 is the sweet spot for a tall portrait element: the first 40% of a 550px video is ~220px, which is visible only when the user has clearly scrolled into that content area.

## Reduced-motion handling

`useReducedMotion()` from framer-motion reads `prefers-reduced-motion: reduce` from the OS. When true, the IntersectionObserver is never set up, so the video stays paused at the poster frame. Native `controls` are always visible, so reduced-motion users can click play themselves. This is consistent with how every other component in the project handles reduced motion.

## Mobile sizing strategy

The container uses `width: 80vw; maxWidth: {maxHeightDesktop * 9/16}px` — on desktop this caps the width at ~338px (keeping height ≤ 600px). On small phones (390px screen), `80vw = 312px` → height ≈ 554px. This slightly exceeds the `maxHeightMobile: 500` guideline, but portrait video is inherently tall and 554px is acceptable. The `maxHeightMobile` prop is reserved in the interface for a future enhancement (e.g. a JS-driven width clamp using `window.innerHeight`). Attempting to cap height at 500px via CSS alone requires knowing the viewport width at render time, which isn't available server-side.

## Why `aspect-[9/16]` is preferred over `object-cover`

The video's native dimensions are exactly 720×1280 (9:16). A container with `aspect-[9/16]` creates a box whose height exactly matches the video's proportions — no letterboxing, no cropping. `object-cover` would also work (since aspect ratios match), but `object-contain` is more semantically correct and safer if the video dimensions ever change. `object-cover` should only be used when intentional cropping is acceptable.

## Backdrop styling decision

The section (`bg-mission-black`) and the video backdrop (`bg-mission-gray-900`) are separated by ~11% lightness. This creates a subtle frame effect without heavy borders. The framing is reinforced by a `border-l-2 border-mission-red` left accent (vertical brand marker) and a `bg-gradient-to-r from-mission-red` bottom accent line. This avoids the "letterbox" look that comes from adding literal black bars above/below a portrait video — the backdrop is visually intentional, not accidental cropping.

## `preload="metadata"` impact

Using `preload="metadata"` means only the video header is fetched on page load (duration, dimensions, poster). The 15 MB MP4 file is not downloaded until the user clicks play or the IntersectionObserver triggers. This is critical for LCP: the poster JPEG (65 KB) loads instantly; the video file loads lazily. Do NOT change to `preload="auto"` — it would download 15 MB on every /about page load.

## What to watch for

- The `InlineVideoPlayer` is a `"use client"` component embedded inside a server component page. This is correct App Router usage and does not make the page a client component. Verify with the build output: `/about` should always show `○ (Static)`.
- If the video doesn't autoplay in production, check that the `controls muted playsInline` attributes are all present. Browsers require all three for programmatic autoplay.
- The `.catch(() => {})` on `video.play()` is intentional — `play()` returns a Promise that rejects if interrupted (e.g. user navigates away mid-play). Unhandled promise rejections crash the console. The empty catch is correct.
