# 2026-04-28 — Lenis smooth scroll integration with Framer Motion

## What was added
`lenis` v2 via `pnpm add lenis`. `LenisProvider` wraps the site in `ReactLenis root` (from `lenis/react`).

## Key implementation decisions

### Use `ReactLenis root`, not a manual RAF loop
`ReactLenis` with `root={true}` handles RAF internally (`autoRaf: true` default) and renders children directly — no wrapper div is added to the DOM. Manual RAF loops risk frame-timing conflicts with Framer Motion's own animation frame.

### `lerp: 1` for prefers-reduced-motion instead of conditional rendering
Conditionally rendering `<ReactLenis>` vs `<>{children}</>` based on `useReducedMotion()` would cause a hydration mismatch: server renders null → false → children without Lenis, client renders with Lenis if motion is allowed. Using `lerp: 1` (instant, no smoothing) on the always-rendered `ReactLenis` avoids structural DOM differences while still respecting the preference. `useMemo` prevents unnecessary options-object re-creation.

### Lenis CSS must be imported
`import "lenis/dist/lenis.css"` in `layout.tsx` is required. The CSS sets `html.lenis { height: auto }` which prevents scroll-height conflicts. Without it, smooth scroll may behave incorrectly on pages taller than the viewport.

## Compatibility with existing features
- `useScroll()` from Framer Motion reads `window.scrollY`, which Lenis controls. ✓
- `useMotionValueEvent(scrollY, "change", ...)` fires correctly as Lenis updates scroll. ✓
- `useInView` (IntersectionObserver) — unaffected by Lenis. ✓
- `sticky` positioning — unaffected in root mode. ✓
- CSS `overflow-hidden` on parallax sections — unaffected. ✓

## Libraries that were NOT added and why
| Library | Reason skipped |
|---|---|
| `@theatre/core + @theatre/r3f` | `@theatre/r3f` requires React Three Fiber (no 3D on site). Core is a dev tool only. |
| `@react-spring/web` | Redundant with Framer Motion. Two physics libraries double bundle + complexity. |
| `splitting.js` | CDN-only, DOM mutation at runtime → hydration mismatch with Next.js SSR. |
| `@iconify/react` | Lucide covers needs. One-off icons → inline SVG. |
| Bebas Neue font | Oswald already fills condensed-display role. Third font = ~15KB extra load. |
| `lottie-react` | No `.lottie`/`.json` animation files exist in the project to use. |
