---
date: 2026-04-30
title: Logo PNG with baked-in dark background — blend mode fix
---

## What the problem was
The logo image (`missionmmalogo.png`, later `missionmmalogo2.png`) has a dark grey/charcoal background baked into the PNG. Against the header's true black (`#0A0A0A`) this created a visible rectangular box around the logo.

## What the fix was
Use CSS blend mode on the `<Image>` element:

```tsx
style={{
  mixBlendMode: "lighten",
  filter: "brightness(1.08) contrast(1.1)",
}}
```

`mixBlendMode: "lighten"` compares each pixel with the background and keeps whichever is lighter. Since the charcoal baked-in background is lighter than true black, the blend makes those pixels disappear into the header. The brightness/contrast filter slightly boosts the logo artwork so it doesn't look washed out.

`mixBlendMode: "screen"` was tried first but left a faint grey box visible because screen compositing doesn't fully eliminate near-black pixels against a true-black background.

## Why it happened
The client provided a PNG exported against a dark background rather than a transparent PNG. Converting to transparent PNG is the ideal long-term fix, but blend mode works well as a CSS-only solution.

## What to watch for in the future
- Always request logos as transparent PNGs (or SVGs) from clients.
- If given a logo with a baked-in background, `mixBlendMode: "lighten"` + brightness/contrast filter is the reliable fix for dark backgrounds.
- `mixBlendMode: "screen"` is better for images with a pure black background; `lighten` is better for near-black/charcoal.
- Keep the blend mode when swapping logo files — it should persist across logo updates.
