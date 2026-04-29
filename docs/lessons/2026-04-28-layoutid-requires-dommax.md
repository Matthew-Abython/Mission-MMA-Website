# 2026-04-28 — layoutId requires domMax, not domAnimation

## What the problem was
`layoutId` on a `m.span` nav underline (for the sliding active-link indicator) silently fails — or throws in strict mode — when `LazyMotion` is configured with `domAnimation`. The underline renders but doesn't slide between nav items.

## What the fix was
Upgraded `app/layout.tsx` from `domAnimation` to `domMax`:

```tsx
// Before
import { LazyMotion, domAnimation } from "framer-motion";
<LazyMotion features={domAnimation} strict>

// After
import { LazyMotion, domMax } from "framer-motion";
<LazyMotion features={domMax} strict>
```

`domMax` adds layout animation support (the `layout` prop and `layoutId`) on top of everything in `domAnimation`.

## Why it happened
Framer Motion splits its features into bundles to allow tree-shaking:
- `domAnimation` (~65KB gzip): basic animations, variants, exit animations, gesture recognition
- `domMax` (~75KB gzip): everything in `domAnimation` + layout animations (`layout`, `layoutId`, `LayoutGroup`)

`layoutId` for shared-element transitions uses the Layout feature, which is in `domMax` only. With `strict={true}`, using a feature not in the bundle throws an error.

## What to watch for in the future
- Any `layoutId` usage, `<motion.div layout>`, or `<LayoutGroup>` requires `domMax`.
- The bundle size cost is ~10KB gzip — acceptable for a site that already uses many Framer Motion features.
- If bundle size ever becomes critical, `domAnimation` can be restored and `layoutId` replaced with CSS transition underlines (`scaleX: 0 → 1`, `origin-left`).
- `useMotionValueEvent`, `useScroll`, `AnimatePresence`, `m.path` SVG transforms — all work with `domAnimation` and do NOT require `domMax`.
