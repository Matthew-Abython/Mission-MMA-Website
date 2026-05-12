# 2026-05-11 — Hero Image Background Prop (imageUrl on HeroGeometric)

## Why

The gym wanted real photography in the hero section instead of the abstract red/dark CSS mesh gradient. A still of the empty mat floor showing the Mission logo was available before a video hype reel was ready. Swapping to a photo required a clean upgrade path that preserves the existing mesh as a fallback and keeps the door open for video integration later.

## What changed

Added an `imageUrl?: string` prop to `HeroGeometricProps` in `components/sections/hero-geometric.tsx`. The component now resolves the background in three-tier priority order:

1. **`videoUrl` provided** → existing muted autoplay `<video>` with mesh blobs + scanline (UNCHANGED behavior)
2. **`imageUrl` provided** → `next/image` with `fill priority sizes="100vw" object-cover object-center quality={90}`, layered dark overlays, no blobs, no scanline
3. **Neither** → original CSS mesh gradient (orbit1/orbit2 blobs + diagonal scanline — UNCHANGED fallback)

`app/page.tsx` now passes `imageUrl="/mission_gym_hero.jpg"`. When a video hype reel is delivered, changing that to `videoUrl="/hero.mp4"` is a one-line swap; the image becomes unused but the prop can stay or be removed.

## The legibility lesson

The mat photo is bright white with daylight windows — a single `bg-black/50` overlay was insufficient; white-on-white was a real risk. The solution is two stacked `absolute inset-0 z-[1]` layers:

1. **Solid darken:** `bg-black/55` — flattens the overall luminance
2. **Bottom-weighted gradient:** `bg-gradient-to-t from-black/80 via-black/40 to-black/20` — extra contrast behind the CTA buttons and subhead at the bottom, less darkening at the top where the logo art is

This layered approach is the right pattern for any bright-field photo (gym, outdoor, white walls) used as a full-bleed hero background on a dark-text-over-light-background risk.

## Asset naming rule (generalized from Pexels-HTML lesson)

Real photos go in `/public/` with all-lowercase names and underscores (no spaces, no hyphens, no uppercase extension). Always verify with `file <path>` before committing — it must report `JPEG image data`, not `HTML document text`. The Pexels lesson established this; it applies to all binary assets.

- Correct: `mission_gym_hero.jpg` — verified `JPEG image data, 1920×1279`
- Wrong: `mission-gym-hero.jpg`, `Mission Gym Hero.JPG`, `mission_gym_hero.JPG`

macOS is case-insensitive and won't catch mismatches; Vercel runs on Linux where they 404.

## Where to next

When a video hype reel is delivered:
1. Place it in `public/videos/` (tracked via Git LFS per `2026-05-07-git-lfs-video-setup.md`)
2. Change `<HeroGeometric imageUrl="/mission_gym_hero.jpg" />` to `<HeroGeometric videoUrl="/videos/mission_hero.mp4" />`
3. The still photo prop can be removed or kept as a secondary fallback by also passing `imageUrl`

The existing `videoUrl` path renders at `opacity: 0.3` over the mesh blobs. For the hype reel, consider whether that opacity is right or if a higher value (e.g., `0.5`) with the solid `bg-mission-black/60` overlay is better for legibility.
