# 2026-05-05 — Reviews Page + AggregateRating JSON-LD

## What the task was
Created `/reviews` page, added "Reviews" to the primary nav, added `buildAggregateRating()` to `lib/schema.tsx`, added `/reviews` to the sitemap, and fixed the legacy `/Home/Reviews` redirect (was pointing to `/`, now points to `/reviews`).

## Key decisions and why

### `buildAggregateRating()` vs `buildAggregateRatingWithReviews()`
`lib/schema.tsx` already had `buildAggregateRatingWithReviews()` which computes an average from a `ReviewInput[]` array and emits full `Review` objects. The new `buildAggregateRating()` is a simpler standalone shape — just the summary stats (5.0 / 200) with `itemReviewed` pointing to the gym — matching what Google uses for rich snippets on a dedicated reviews page.

### Redirect `/Home/Reviews` → `/reviews` is safe in next.config.ts
The self-loop lesson says to use `middleware.ts` when `source.toLowerCase() === destination`. Here `/Home/Reviews`.toLowerCase() = `/home/reviews` ≠ `/reviews`, so there is no self-loop risk. next.config.ts is the right place.

### "Write a Google Review" button is `href="#"`
Said Hatim needs to supply the direct Google review link. The button is wired and styled — just swap `#` for the real URL.

## What to watch for
- The Google review link placeholder (`#`) in Section 3 of `app/reviews/page.tsx` must be replaced by the real URL before launch.
- If `REVIEWS` array is ever moved to a shared data file, the `/reviews` page import path changes accordingly.
- When adding more reviews, maintain the 3-column grid balance (multiples of 3 look best at desktop).
