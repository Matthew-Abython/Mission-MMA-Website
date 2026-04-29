# Lesson: Replace placeholder Unsplash photo with real owner photo

**Date:** 2026-04-28

## What the problem was
The `CoachSchedulingCard` on `/book` was using a random Unsplash stock photo as the coach avatar. This showed a stranger next to "Mission MMA & Fitness" rather than the actual owner Said.

## What the fix was
- Copied `Photo of Said.jpg` from the desktop to `public/said.jpg`.
- Updated `defaultCoach.imageUrl` in `components/ui/coach-scheduling-card.tsx` from the Unsplash URL to `/said.jpg`.
- The image renders in two places within the component (main view w-16 and confirmation view w-12) — both use `coach.imageUrl` so one change covers both.

## Why it happened
The component was scaffolded with a placeholder image URL that was never replaced with a real photo.

## What to watch for in the future
- Stock/placeholder images in scaffolded components must be replaced before going live.
- Local public-folder images are served at `/filename` — no domain config needed for Next.js.
- The image appears in both the main scheduling view and the confirmation panel; always check all usages.
