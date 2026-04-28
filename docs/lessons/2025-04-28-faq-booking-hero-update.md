# 2025-04-28 — FAQ, Booking Calendar, HeroGeometric, Photo Fix

## Changes made
- Replaced HomeHero (video) with HeroGeometric (animated shape background)
- Added lib/faq-data.ts with 18 items (7 existing + 11 new SEO-optimized)
- Created /faq route and condensed home FAQ section with FAQPage schema
- Added /book calendar page with Monday/Thursday slot logic and n8n webhook
- Fixed stat counter 2,014 → 2014
- Added phone number to nav, footer, contact page
- Replaced off-topic discipline photos in program grid

## Watch for
- Pexels image URLs: always curl -I verify Content-Type is image/jpeg before committing
- useReducedMotion must be imported from framer-motion
- react-aria-components: check for TypeScript errors on version updates
- NEXT_PUBLIC_N8N_BOOKING_URL must be set in Vercel env vars before /book form works in production
