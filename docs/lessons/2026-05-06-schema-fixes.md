# 2026-05-06 — Schema Fixes: Logo, OG Image, foundingDate, X Social Link

## What was changed

Four fixes to `lib/schema.tsx` GYM constant and `buildLocalBusiness()`:

### 1. Logo URL
- **Before:** `"https://missionmmachicago.com/logo.svg"`
- **After:** `"https://missionmmachicago.com/missionmmalogo2.png"`
- **Why:** `logo.svg` never existed in `/public`. The actual logo file is `missionmmalogo2.png`, which is what the site header uses.

### 2. OG Image URL
- **Before:** `"https://missionmmachicago.com/og-image.jpg"`
- **After:** `"https://missionmmachicago.com/opengraph-image"`
- **Why:** The OG image is generated dynamically at runtime by `app/opengraph-image.tsx` via `next/og`. The route is `/opengraph-image` (no extension), not a static `/og-image.jpg` file.

### 3. foundingDate
- **Added:** `foundingDate: "2016"` in `buildLocalBusiness()` return object, after `priceRange`
- **Why:** Schema.org `foundingDate` is a strong local business signal — it confirms the gym has been established for 9+ years, which is a trust indicator for Google Knowledge Panel and AI citations.

### 4. Twitter → X URL
- **Before:** `"https://twitter.com/MissionMMAChi"`
- **After:** `"https://x.com/MissionMMAChi"`
- **Why:** Twitter rebranded to X and moved to x.com. Using the old twitter.com URL still resolves via redirect, but x.com is now canonical for `sameAs` schema.

## What to watch for in the future
- When adding or swapping the logo, update `GYM.logo` in `lib/schema.tsx` to match the actual filename in `/public`.
- The OG image is a dynamic route — never use a `.jpg` or `.png` extension for it in schema.
- `sameAs` URLs should use canonical domain names (x.com not twitter.com, instagram.com not instagr.am, etc.).
