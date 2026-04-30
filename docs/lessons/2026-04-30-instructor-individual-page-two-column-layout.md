# 2026-04-30 — Instructor Individual Page: Two-Column Layout

## What changed

`app/instructors/[slug]/page.tsx` was rebuilt from a `ClassPageHero`-based layout to a two-section two-column layout. The hub page (`app/instructors/page.tsx`) and data file (`lib/instructors.ts`) were not touched.

## Why ClassPageHero was dropped for instructor pages

`ClassPageHero` is a 70vh full-bleed cinematic hero designed for discipline/class pages — it works well when the subject is a sport or concept (BJJ, Muay Thai) because it fills the frame dramatically. For an instructor portrait, this approach caused persistent cropping problems: the full-bleed format sacrificed the instructor's face to the parallax layer and gradient overlay.

The two-column layout gives the instructor photo proper portrait framing — it's contained, appropriately sized, and shows the instructor clearly without competing with a gradient or parallax effect.

## New standard layout for all instructor individual pages

**Section 1 — Dark header bar (`bg-mission-black`)**
- Breadcrumb trail (Instructors → Name)
- H1: instructor name (Oswald, uppercase, white, text-5xl/6xl)
- Instructor title (Inter, `--mission-red`)
- Discipline badges (rounded-full, bg-mission-gray-700)
- "Book a Free Class" red CTA button → `/book`
- No background photo in this section

**Section 2 — Two-column layout (`background: #111111`)**
- `flex-col` on mobile, `flex-row` on md+
- Left column (`w-full md:w-2/5`): portrait photo in a `relative h-[420px] md:h-[580px] overflow-hidden rounded-lg` container with `next/image fill + object-cover + objectPosition`
- Right column (`w-full md:w-3/5`): full `fullBio` paragraphs at 18px / lineHeight 1.8 / `--mission-gray-300`, then "← All Instructors" text link in `--mission-red`

## Image technique

Use `fill` inside a height-constrained container — NOT explicit `width`/`height` props — for portrait photos with `object-cover` + `object-position` behavior. This is the correct Next.js pattern when cropping and positional anchoring are required. Explicit width/height only works without cropping (the image shows at its intrinsic aspect ratio).

The `heroPhotoPosition` field in `lib/instructors.ts` drives `objectPosition` inline style on the image. See `2026-04-30-instructor-hero-photo-position.md` for the full photo prep rule.

## What's preserved from the old layout

- `generateStaticParams()` — unchanged
- `generateMetadata()` — unchanged
- BreadcrumbList + Person JSON-LD — unchanged
- `notFound()` guard for unknown slugs — unchanged

## Adding future instructors

All future instructor individual pages inherit this layout automatically via `lib/instructors.ts`. To add instructor #2:
1. Add their entry to `INSTRUCTORS` in `lib/instructors.ts`
2. Place their photos in `/public`
3. Set `heroPhotoPosition` if their portrait subject is off-center
4. Done — layout renders automatically
