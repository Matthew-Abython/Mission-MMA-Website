# 2026-04-28 — Multi-layer parallax: image must be pre-offset to avoid top-edge exposure

## What the problem was
A three-layer parallax hero (image +80px, gradient +40px, text +20px) translates the background image downward relative to the section as the user scrolls. If the image starts at `top: 0`, moving it down by +80px exposes 80px of the section's background colour at the top edge — a visible "gap" that destroys the illusion.

## What the fix was
Position the image wrapper at `top: -80px` (the maximum downward shift) and give it `h-[130%]` so there is always enough image to fill the section at any scroll position:

- At y=0 (hero at top of viewport): wrapper spans [-80px, 91vh] relative to section. The top 80px is outside the section bounds and clipped by `overflow-hidden`. ✓
- At y=+80px (hero half-scrolled): wrapper spans [0, 91vh+80px]. Top aligns with section, extra height clips below. ✓

`overflow-hidden` on the section handles all clipping automatically; the image just needs enough pre-loaded buffer above its starting position.

## Why it happened
`useTransform(scrollYProgress, [0, 1], [0, 80])` shifts the element DOWN (positive y) in the section's coordinate space. Without a negative top offset matching the maximum shift, the image top rises above the section container and exposes the background.

## What to watch for in the future
- **Rule of thumb**: for a parallax that shifts an element DOWN by N pixels, start the element at `top: -Npx`. For upward shifts, add N to the bottom. The `h-[130%]` ensures vertical coverage regardless of direction.
- The gradient overlay (+40px shift) is small enough relative to the section height that no extra offset is needed — the section background colour showing briefly at the top edge is dark, matching the gradient start. Only the image needs the negative-top fix because any exposed area is visually wrong.
- The `offset: ["start start", "end start"]` on `useScroll` means progress goes 0→1 as the section *exits* the viewport from the top. The max transform applies just as the section becomes invisible — the parallax effect therefore only matters while progress is 0–0.7 (section still partially on screen).
