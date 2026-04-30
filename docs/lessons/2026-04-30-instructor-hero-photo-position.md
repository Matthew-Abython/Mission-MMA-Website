# 2026-04-30 — Instructor Hero Photo Position (object-position)

## What the problem was

The hero image on `/instructors/said-hatim` was cropping Said's face out of frame. The photo subject is positioned on the right side of the image, but `next/image` with `object-cover` defaults to centering the image horizontally. The result was a hero showing the gym wall instead of Said's face.

## What the fix was

1. Added `heroPhotoPosition?: string` to the `Instructor` interface in `lib/instructors.ts` — a CSS `object-position` value.
2. Set `heroPhotoPosition: "right center"` on Said Hatim's entry.
3. Added `imagePosition?: string` prop (default `"center"`) to `ClassPageHeroProps` in `components/sections/class-page-hero.tsx`.
4. Applied it as `style={{ objectPosition: imagePosition }}` on the `<Image>` element inside the hero.
5. In `app/instructors/[slug]/page.tsx`, passed `imagePosition={instructor.heroPhotoPosition ?? "center"}` to `<ClassPageHero>`.

The `heroPhotoPosition` field is optional — instructors without it get `"center"` as the fallback. This means adding a new instructor with a centered subject requires no extra field.

## Photo prep rule for future instructors

| Subject position in frame | `heroPhotoPosition` value |
|---|---|
| Center of frame | omit (defaults to `"center"`) |
| Right side of frame | `"right center"` |
| Left side of frame | `"left center"` |
| Top of frame | `"center top"` |
| Specific offset needed | any valid CSS `object-position` value |

When cropping problems occur on any page using `ClassPageHero`, check `object-position` first — the image may be the right photo but just anchored to the wrong edge.

## Why it happens

`object-cover` scales the image to fill the container without distortion, then clips whatever doesn't fit. Without an explicit `object-position`, CSS defaults to `50% 50%` (center). If the subject of interest isn't at the center of the photo, they will be clipped.

The `imagePosition` prop is available to all consumers of `ClassPageHero`, not just instructor pages — class discipline pages can use it too if a future hero photo needs repositioning.
