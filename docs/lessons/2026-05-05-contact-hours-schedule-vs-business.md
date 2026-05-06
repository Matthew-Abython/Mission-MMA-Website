# 2026-05-05 — Contact Page Hours: Schedule-Derived vs. Official Business Hours

## What the problem was
The contact page derived open hours from `lib/schedule.ts` using a `deriveHours()` function that computed first-class-start → last-class-end for each day. These times differed from the official Yelp business hours on 5 of 7 days (e.g., Monday was showing 4:30 PM – 7:30 PM instead of 9:00 AM – 8:30 PM).

## What the fix was
Replaced `deriveHours()` and the `lib/schedule` import in `app/contact/page.tsx` with a static `CONTACT_HOURS` array sourced from the official Yelp listing. `lib/schedule.ts` and `WeeklySchedule` component were not touched.

## Why it happened
Class schedule hours (when classes run) ≠ business hours (when the gym is open). A gym may open early for open gym, personal training, or front desk access before the first scheduled class, and may stay open after the last class ends.

## What to watch for in the future
- **Never derive displayed business hours from the class schedule.** They serve different purposes.
- `lib/schedule.ts` is the source of truth for class times and the `/schedule` page — not for the contact page.
- If the gym's official hours change (e.g., seasonal hours), update `CONTACT_HOURS` in `app/contact/page.tsx` directly.
- The `deriveHours()` pattern could be useful internally (e.g., for JSON-LD openingHours) but must not be shown verbatim to visitors as business hours.
