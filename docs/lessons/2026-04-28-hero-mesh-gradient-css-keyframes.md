# 2026-04-28 — CSS keyframes for hero mesh background must live in globals.css

## What the problem was
The new hero requires CSS `@keyframes` for orbiting gradient blobs, a glow-pulse text-shadow, and a bouncing chevron. These can't be defined inline in a Next.js client component — there's no styled-jsx or CSS modules in use.

## What the fix was
Defined all four `@keyframes` blocks (`orbit1`, `orbit2`, `glow-pulse`, `chevron-bounce`) at the bottom of `app/globals.css`, then referenced them via `style={{ animation: '...' }}` inline props on the relevant elements.

## Why it happened
Next.js App Router doesn't allow `<style>` tags inside client components without a CSS-in-JS library. The only global stylesheet is `globals.css`, which is the correct place for keyframe animations used by Tailwind-only components.

## What to watch for in the future
- Any CSS `@keyframes` that a component needs must be added to `globals.css`.
- Wrap CSS-animated elements in `{!reduced && (...)}` or guard with `style={reduced ? undefined : { animation: '...' }}` so `prefers-reduced-motion` is respected.
- The global `@media (prefers-reduced-motion: reduce)` rule in globals.css sets `animation-duration: 0.01ms !important` which provides a safety net, but component-level checks are still best practice.
