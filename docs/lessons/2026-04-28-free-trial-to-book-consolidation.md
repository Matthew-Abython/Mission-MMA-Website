# Lesson: Route consolidation — /free-trial → /book

**Date:** 2026-04-28

## What the problem was
The site had two booking entry points: `/free-trial` (old form-based flow) and `/book` (new `CoachSchedulingCard` flow). CTAs across 15+ files still pointed to `/free-trial`, the booking webhook used a client-exposed `NEXT_PUBLIC_` env var, and a redundant mini lead form lived in the footer.

## What the fix was
- Added `permanent: true` redirects in `next.config.ts` for `/free-trial` → `/book` and `/free-trial/thank-you` → `/book`.
- Replaced all `href="/free-trial"` occurrences site-wide with `href="/book"` (hero, header, sticky mobile CTA, footer nav, schedule, about, contact, all 6 class pages, class-page-template).
- Moved the booking webhook call from a client-side `fetch` (using `NEXT_PUBLIC_N8N_BOOKING_URL`) to a new `app/actions/submit-booking.ts` server action (using the server-only `N8N_WEBHOOK_URL` already used by `submit-lead.ts`).
- Removed the footer mini lead form (`<LeadForm source="footer" variant="compact" />`) and its `LeadForm` import.

## Why it happened
The `/book` page was added as a newer UX but the old `/free-trial` route was never retired. CTAs were added incrementally with no central link registry.

## What to watch for in the future
- When adding a new page that replaces an old one, immediately add a redirect in `next.config.ts` and do a `grep -r` sweep for the old path.
- Client-side `NEXT_PUBLIC_` env vars expose webhook URLs in the browser bundle — always route sensitive external calls through server actions.
- `no-explicit-any` lint rule is enforced — use typed window augmentation (`window as Window & { gtag?: ... }`) instead of `(window as any)`.
