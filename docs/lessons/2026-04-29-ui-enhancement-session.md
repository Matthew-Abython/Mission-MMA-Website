# 2026-04-29 — UI Enhancement Session: Key Decisions and Gotchas

Six technical decisions made during the visual upgrade session that are non-obvious and likely to recur.

---

## 1. LazyMotion must use `domMax` when `layoutId` is used

`layoutId` powers Framer Motion's shared-element transitions (e.g. a sliding nav underline that morphs between active items). It uses the **Layout** feature, which is only included in `domMax` — not in `domAnimation`.

With `LazyMotion features={domAnimation} strict`, using `layoutId` throws in strict mode.

**Fix:** change the import and the `features` prop:
```tsx
// layout.tsx
import { LazyMotion, domMax } from "framer-motion";
<LazyMotion features={domMax} strict>
```

**Cost:** ~10KB gzip over `domAnimation`. Acceptable given the site already uses many Framer Motion features.

**What does NOT need `domMax`:** `useScroll`, `useTransform`, `useMotionValueEvent`, `AnimatePresence`, `m.path` SVG transforms, `useVelocity`, `useSpring`, `useAnimationFrame` — all work in `domAnimation`.

---

## 2. `animation-play-state: paused` pauses CSS @keyframes — NOT Framer Motion WAAPI animations

These are two completely separate animation systems:

- **CSS animations** (`animation:` shorthand, `@keyframes`) → controlled by `animation-play-state: paused` via CSS property or React inline `style`.
- **Framer Motion WAAPI animations** (`animate={{ x: ["0%", "-50%"] }}`) → created via `element.animate()`, NOT affected by `animation-play-state`. Paused via `animation.pause()` on the `AnimationPlaybackControls` object.

**Rule:** If an animation needs hover-pause behavior, implement it as CSS `@keyframes` + React state toggling `animationPlayState`. Do not use Framer Motion's `animate` prop for animations that need to pause on hover.

---

## 3. `Math.random()` in server components causes hydration mismatch

Next.js App Router renders server components on the server. If a server component calls `Math.random()` to generate CSS values (e.g. particle positions), the server produces one set of values and the client hydrates expecting the same values — but `Math.random()` gives different numbers on each call.

**Fix:** use a static pre-computed array for any per-element variation. The values are chosen once and never change.

```tsx
// Bad — different on server vs client
const opacity = Math.random() * 0.3 + 0.3;

// Good — static, consistent
const PARTICLES = [
  { opacity: 0.35, left: 3, ... },
  // ...
];
```

---

## 4. SVG path morphing requires `transformBox: "fill-box"` and `transformOrigin: "center"`

When animating `rotate` or `scale` on Framer Motion `m.path` elements (e.g. a hamburger→X morph), the default CSS `transform-origin` resolves to the SVG **viewport** origin (0, 0) — not the element's own center. This causes the bars to rotate around the wrong point.

**Fix:** add these two CSS properties to the `style` prop of each animated SVG path:

```tsx
style={{
  transformBox: "fill-box",    // use the element's bounding box for origin
  transformOrigin: "center",   // relative to that bounding box
}}
```

This makes `rotate: 45` pivot around the path's own center, which is what's needed for correct hamburger→X animation.

---

## 5. Lenis: use `lerp: 1` (not conditional render) for `prefers-reduced-motion` users

`ReactLenis root` with `root={true}` renders children directly — no wrapper div. The DOM structure is identical whether Lenis is active or not. This allows the same `<ReactLenis root>` to always be rendered, with the smoothing behavior controlled by the `lerp` option:

```tsx
const options = useMemo(() => ({
  lerp: reduced ? 1 : 0.1,  // 1 = instant/native, 0.1 = silky smooth
}), [reduced]);
```

**Why not conditional render?** If `reduced` is `false` on SSR (since `useReducedMotion()` returns `null` → `?? false`), and then becomes `true` on the client for a user with `prefers-reduced-motion`, React would try to swap from `<ReactLenis>children</ReactLenis>` to `<>{children}</>`. Even though `ReactLenis root` renders no wrapper div, React still sees a different component tree and would cause a hydration mismatch.

---

## 6. CSS `@keyframes` cannot be defined inside component files

Next.js App Router client components do not support `<style>` tags without a CSS-in-JS library. There is no styled-jsx in this project.

**Rule:** All `@keyframes` blocks must be defined in `app/globals.css`. Reference them by name in component `style` props:

```css
/* globals.css */
@keyframes my-animation { ... }
```

```tsx
// Component
<div style={{ animation: "my-animation 2s ease infinite" }} />
```

**Reduced motion:** the global rule `@media (prefers-reduced-motion: reduce) { animation-duration: 0.01ms !important; }` in globals.css provides a site-wide fallback. Component-level checks (`style={reduced ? undefined : { animation: "..." }}`) are still best practice for server components where the global CSS rule applies but the component runs on the server.
