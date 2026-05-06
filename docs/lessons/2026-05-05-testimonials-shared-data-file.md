# 2026-05-05 — Extract Testimonials to Shared Data File

## What the task was
The testimonial-marquee.tsx had its own hardcoded Testimonial interface and 6-item array. The reviews page had its own separate 9-item REVIEWS array. Both needed to share a single source of truth.

## What the fix was
Created lib/testimonials.ts with a Testimonial interface (id, name, initials, text, discipline) and 12 canonical entries. testimonial-marquee.tsx imports from there and splits into row1 (slice 0-6) and row2 (slice 6-12). app/reviews/page.tsx imports TESTIMONIALS and maps over all 12 entries.

## Key decisions
- Added discipline-colored avatar circles to marquee cards: muay-thai=#7a1218, bjj=#1a3a5c, kids=#1a4a2a, womens=#4a1a3a, events/general=#3d3d3d
- Reviews page keeps red avatars (no discipline color) — the reviews grid doesn't use discipline as a visual signal
- Used t.id for React keys on the reviews page instead of t.name (more stable)
- Did NOT reverse row2 in the marquee — spec explicitly defined row2 as slice(6), not reversed

## What to watch for in the future
- Any new testimonial additions should go in lib/testimonials.ts only — do not add to individual components
- The marquee always takes rows 0-5 and 6-11; if TESTIMONIALS grows beyond 12, the slice(6) row2 will include all entries past index 5
- The discipline field drives avatar colors in the marquee — verify the discipline value is set correctly when adding entries
