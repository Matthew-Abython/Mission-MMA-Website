# 2026-04-28 — Hover-pause on infinite marquee: CSS animations, not Framer Motion keyframes

## What the problem was
The spec called for `whileHover: { animationPlayState: 'paused' }` on Framer Motion `m.div` elements running infinite keyframe animations (`animate={{ x: ["0%","-50%"] }}`). In practice, `animation-play-state: paused` only affects CSS animations defined via the `animation:` CSS property — it has NO effect on WAAPI animations created by `element.animate()`, which is what Framer Motion v12 uses for keyframe arrays.

## What the fix was
Implemented the marquee scroll as CSS `@keyframes` (`marquee-left` and `marquee-right` in globals.css), applied via inline `style={{ animation: "marquee-left 30s linear infinite" }}`. Hover pause is handled with `useState` toggling `animationPlayState: "paused" | "running"` on the same element. Both rows pause simultaneously via a single `onMouseEnter`/`onMouseLeave` on their shared wrapper.

## Why it happened
`animation-play-state` is a CSS property that controls CSS animations only. Framer Motion v12 uses the Web Animations API (`element.animate()`) for `animate={{ x: [...] }}` keyframe arrays. WAAPI animations are paused via `animation.pause()` on the AnimationPlaybackControls object — not via CSS. These are two completely separate animation systems.

## What to watch for in the future
- If you need hover-pause on an infinite animation: use CSS @keyframes + `animationPlayState` state. It's reliable and has no position reset on resume.
- If you need Framer Motion keyframe arrays (`animate={{ x: [...] }}`) AND pause behavior: use `useAnimate()` from framer-motion, store the returned `AnimationPlaybackControls` ref, and call `.pause()` / `.play()` directly. Do NOT use `whileHover` for this.
- Framer Motion's `LazyMotion` with `domAnimation` does NOT include the `useAnimate` composited imperative API — that would need a different feature set or direct import of `animate` from `"framer-motion"`.
- `marquee-right` keyframe runs from `translateX(-50%)` to `translateX(0%)`. The doubled array ensures both the -50% start and the 0% end show identical content (seamless loop).
