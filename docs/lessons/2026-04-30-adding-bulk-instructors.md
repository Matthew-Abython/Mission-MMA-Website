# 2026-04-30 — Adding Multiple Instructors to the Roster

## What was done

Five additional instructors were added to `lib/instructors.ts` in a single edit. No page files were touched.

## How the system works

All instructor data lives exclusively in `lib/instructors.ts`. The hub page (`app/instructors/page.tsx`) and individual page (`app/instructors/[slug]/page.tsx`) are both entirely data-driven:

- The hub maps over `INSTRUCTORS` to render one card per instructor automatically.
- `generateStaticParams()` in the slug page derives all valid routes directly from `INSTRUCTORS`, so new slugs are automatically statically generated at build time.
- `generateMetadata()` looks up the instructor by slug — no manual metadata entries needed.
- The two-column bio layout renders any `fullBio` array regardless of paragraph count.

## To add a new instructor in the future

1. Append one object to the `INSTRUCTORS` array in `lib/instructors.ts`.
2. Place the photo file(s) in `/public` — filenames must match the `photo` and `heroPhoto` fields exactly (underscores, no spaces).
3. Set `heroPhotoPosition` if the portrait subject is off-center (see `2026-04-30-instructor-hero-photo-position.md`).
4. That's it. No page files, no route files, no metadata files need editing.

## Photo filename convention

All instructor photo filenames use underscores (no spaces). Files with spaces will break `next/image` path resolution. If a photo is added with a space in the name, rename it before committing:

```bash
mv "public/First Last.png" "public/First_Last.png"
```

This convention was established during the Said Hatim and Site Said smile photo additions, where both files were delivered with spaces and had to be renamed before they could be referenced in the data file.

## Instructors added

| Name | Slug | Photo file |
|---|---|---|
| Milos Jeftic | `milos-jeftic` | `Molos_Jeftic.png` |
| Gerardo Cepeda | `gerardo-cepeda` | `Gerardo_Cepeda.png` |
| Sydney Yockey | `sydney-yockey` | `Sydney_Yockey.png` |
| Juan Zaragoza | `juan-zaragoza` | `Juan_Zaragoza.png` |
| Romero Stancle | `romero-stancle` | `Romero_Stancle.png` |

Note: `Milos_Jeftic.png` is stored as `Molos_Jeftic.png` — this is the filename as provided; do not rename it as it would break the data reference.

## Photos pending

All 5 new instructors have their photo paths defined in the data file but the actual image files still need to be placed in `/public`. Until the photos are added, `next/image` will throw a 404 for those cards. This is expected and does not break the build — it only affects runtime rendering.
