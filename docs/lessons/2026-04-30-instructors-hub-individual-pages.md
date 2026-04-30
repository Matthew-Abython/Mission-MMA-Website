# 2026-04-30 — Instructors Hub + Individual Page System

## What was built

A two-level instructor system:
- `/instructors` — hub page with a card grid
- `/instructors/[slug]` — individual instructor detail page using `ClassPageHero`

## Data structure chosen

`lib/instructors.ts` is the single source of truth. It exports an `Instructor` interface and an `INSTRUCTORS` array. Adding a new instructor requires only appending one object to the array — no other files need to change.

```typescript
interface Instructor {
  slug: string;
  name: string;
  title: string;
  photo: string;       // path relative to /public, e.g. "/Said_Hatim.png"
  shortBio: string[];  // first 2 paragraphs — shown on hub card
  fullBio: string[];   // all paragraphs — shown on individual page
  disciplines: string[];
}
```

The hub page maps over `INSTRUCTORS` to render cards. The `[slug]/page.tsx` uses `generateStaticParams()` derived from `INSTRUCTORS` so it never needs manual updates either.

## How to add a new instructor

1. Add a new object to the `INSTRUCTORS` array in `lib/instructors.ts`.
2. Place the photo at the path specified in `instructor.photo` (e.g. `public/new-instructor.png`).
3. Done — the hub card, individual page, `generateStaticParams()`, and all JSON-LD are auto-generated.

## buildPerson() parameters

`buildPerson()` in `lib/schema.tsx` takes `InstructorInput`:
- `name`, `slug`, `jobTitle`, `bio` are required
- `image` must be an **absolute URL** (prefix with `GYM.url`)
- `beltRank`, `lineage`, `yearsTraining`, `competitionRecord`, `sameAs` are optional but fill out the Person JSON-LD for SEO

It does NOT have a `disciplines` or `title` field — use `jobTitle` for title, and fold discipline info into `bio` or `competitionRecord`.

## Local images in /public

Photos placed in `/public` are served as static files at `/<filename>` — no `remotePatterns` entry is needed for `next/image` to use them. Only external hostnames require `remotePatterns`.

For this build, `missionmmachicago.com` and `res.cloudinary.com` were added to `remotePatterns` for future use (production domain og images, optional Cloudinary CDN).

## Gotchas

- **Said_Hatim.png must be placed in `/public`** before the instructor photo renders. The code references `/Said_Hatim.png`. Do NOT rename or move `said.jpg` — that file is used by `CoachSchedulingCard` on `/book`.
- **Navigation was already wired** — `PRIMARY_NAV` in `site-header.tsx` already had `{ href: "/instructors", label: "Coaches" }`. No nav changes needed.
- **No motion imports** — both instructor pages are pure server components. No `m.*` or Framer Motion is used directly. `ClassPageHero` (used on the detail page) is a client component that handles its own parallax — no `"use client"` needed in the page itself.
- **ClassPageHero breadcrumbs type** — uses `Breadcrumb` interface from `class-page-hero.tsx`: `{ label: string, href?: string }`. The last crumb has no `href` (current page), earlier crumbs have `href`.
- **`absoluteTitle: true`** — used on individual pages so the title template doesn't double-append "| Mission MMA & Fitness" to the already-complete title string `"Said Hatim — Head Coach & Owner | Mission MMA & Fitness"`.
