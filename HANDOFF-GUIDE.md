# Mission MMA Website — Handoff Guide

Paste this file into a fresh Claude session to give it complete context about the website so it can plan or implement changes. Keep this file up-to-date: after every change to the website, update the relevant sections here.

---

## Project Identity

- **Client:** Said Hatim — Mission MMA & Fitness, Chicago West Loop
- **Address:** 1620 W Carroll Ave, Chicago, IL 60612
- **Phone:** 312-265-1856
- **Email:** info@missionmmachicago.com
- **Repo:** GitHub → Mission-MMA-Website
- **Local path:** ~/Desktop/Mission-MMA-Website

---

## Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS v4 + PostCSS | 4.x |
| Components | shadcn/ui (base-nova preset) | — |
| Animation | Framer Motion (LazyMotion) | — |
| Forms | React Hook Form + Zod | — |
| Icons | Lucide React | — |
| Toasts | Sonner | — |
| Package Manager | pnpm | — |

No database. No CMS. No auth. Pure marketing site with one outbound webhook to n8n.

---

## Complete File Tree

```
Mission-MMA-Website/
├── app/
│   ├── actions/
│   │   ├── submit-booking.ts       # Server action: booking form → n8n
│   │   └── submit-lead.ts          # Server action: lead form → n8n
│   ├── about/
│   │   └── page.tsx                # /about page
│   ├── book/
│   │   └── page.tsx                # /book page (CoachSchedulingCard)
│   ├── classes/
│   │   ├── page.tsx                # /classes hub
│   │   ├── brazilian-jiu-jitsu/page.tsx
│   │   ├── muay-thai/page.tsx
│   │   ├── mma/page.tsx
│   │   ├── womens-bjj/page.tsx
│   │   ├── kids/page.tsx
│   │   ├── open-mat/page.tsx
│   │   └── strength-conditioning/page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── free-trial/
│   │   ├── page.tsx                # Legacy — redirected to /book via next.config.ts
│   │   └── thank-you/page.tsx      # Legacy — redirected to /book via next.config.ts
│   ├── instructors/
│   │   ├── page.tsx                # Placeholder ("coming soon")
│   │   └── [slug]/page.tsx         # Dynamic instructor page (no data yet)
│   ├── schedule/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css                 # Tailwind v4 + brand tokens + dark theme
│   ├── layout.tsx                  # Root layout: fonts, analytics, header, footer
│   ├── page.tsx                    # Home page
│   ├── robots.ts
│   ├── sitemap.ts
│   └── template.tsx                # Per-page fade-in animation wrapper
│
├── components/
│   ├── analytics/
│   │   ├── ga4.tsx                 # GA4 script + gtag init
│   │   └── meta-pixel.tsx          # Facebook Pixel init + noscript fallback
│   ├── forms/
│   │   ├── conversion-tracking.tsx # Fires fbq("Lead") + gtag("generate_lead") on mount
│   │   └── lead-form.tsx           # Main lead capture form (RHF + Zod)
│   ├── layout/
│   │   ├── footer.tsx
│   │   ├── site-header.tsx         # Sticky header + mobile hamburger menu
│   │   └── sticky-mobile-cta.tsx   # Floating "Book" button on mobile
│   ├── motion/
│   │   └── animated-counter.tsx    # Scroll-triggered number counter
│   ├── schedule/
│   │   └── weekly-schedule.tsx     # Filterable 7-day class grid
│   ├── sections/
│   │   ├── class-page-hero.tsx     # Hero for discipline pages
│   │   ├── class-page-template.tsx # Shared layout for all 7 class pages
│   │   ├── faq-section.tsx         # Accordion FAQ
│   │   ├── hero-geometric.tsx      # Home page hero with animated shapes
│   │   ├── program-grid.tsx        # 7-card discipline grid on home page
│   │   ├── stat-counters.tsx       # Animated stats ("30+ classes/week")
│   │   ├── testimonial-marquee.tsx # Looping testimonial carousel
│   │   └── why-train-here.tsx      # 3-column value propositions
│   └── ui/                         # shadcn/ui primitives
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── coach-scheduling-card.tsx  # Custom booking calendar + form
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── sheet.tsx               # Mobile slide-out drawer
│       ├── sonner.tsx
│       └── tabs.tsx
│
├── lib/
│   ├── faq-data.ts                 # 17 FAQ items in 5 categories
│   ├── lead-schema.ts              # Zod schema for lead form validation
│   ├── motion.ts                   # Framer Motion variants + easing constants
│   ├── schedule.ts                 # WEEKLY_SCHEDULE typed data (30 classes)
│   ├── schema.tsx                  # JSON-LD builders (SEO + AIO)
│   ├── seo.ts                      # buildMetadata() + buildClassPageMetadata()
│   └── utils.ts                    # cn() — Tailwind class merger
│
├── docs/
│   └── lessons/                    # Post-mortems — READ BEFORE EDITING
│       ├── 2026-04-25-shadcn-nova-preset-no-form-component.md
│       ├── 2026-04-27-magic-mcp-builder-returns-empty.md
│       ├── 2026-04-27-nextjs-redirects-case-insensitive-self-loop.md
│       ├── 2026-04-27-pexels-poster-url-returns-html.md
│       ├── 2026-04-28-booking-form-email-to-phone.md
│       ├── 2026-04-28-conversion-tracking-timing.md
│       ├── 2026-04-28-framer-motion-variant-type-as-const.md
│       ├── 2026-04-28-free-trial-to-book-consolidation.md
│       ├── 2026-04-28-framer-motion-variant-propagation-stagger.md
│       ├── 2026-04-28-hero-mesh-gradient-css-keyframes.md
│       └── 2026-04-28-replace-placeholder-photo-with-owner.md
│
├── public/
│   ├── hero-poster.jpg             # Static hero image
│   ├── said.jpg                    # Photo of gym owner Said Hatim (used in booking card)
│   └── llms.txt                    # LLM-readable gym summary for AIO/GEO
│
├── .env.local                      # Real secrets — NOT committed
├── .env.local.example              # Template showing required vars
├── next.config.ts                  # Image domains + 301 redirects
├── middleware.ts                   # Case-sensitive redirects (3 rules)
├── components.json                 # shadcn config (base-nova, lucide, @/ alias)
├── CLAUDE.md                       # Claude Code project instructions
├── HANDOFF-GUIDE.md                # This file
├── PLAN.md                         # Original build plan (historical)
├── AIO-PLAYBOOK.md                 # AIO/GEO content strategy guide
├── ANIMATION-PLAYBOOK.md           # Framer Motion patterns reference
├── BUILD-GUIDE.md                  # Original build steps
└── *.md                            # Content drafts (bjj.md, muay-thai.md, etc.)
```

---

## Pages

### `/` — Home (`app/page.tsx`)
Server component. Sections top to bottom:
1. `<HeroGeometric>` — full-viewport dark hero. CSS mesh background (two blurred radial gradients orbiting via `orbit1`/`orbit2` keyframes at 18s/25s + diagonal scanline overlay). Staggered Framer Motion reveal: red rule → eyebrow → H1 "FORGE YOUR / MISSION." (glow-pulse keyframe on "MISSION.") → subhead → two CTAs ("Claim Your Free Class" + "View Schedule"). Scroll-fading chevron via `useScroll`+`useTransform`. Optional `videoUrl` prop renders a muted autoplay video behind the mesh. All animations gate on `useReducedMotion`.
2. `<ProgramGrid>` — bento grid of 7 discipline cards. Top row: 2 featured cards (BJJ + Muay Thai) in `grid-cols-2` at `aspect-video` (16/9). Bottom row: 5 smaller cards in `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` at `aspect-[4/3]`. Each card: full-bleed `Next/Image`, bottom-to-top gradient overlay, red left-border accent (CSS `group-hover:w-[3px]`), Oswald badge + H3 + Inter description. Framer Motion: `whileHover="cardHover"` on article propagates to image wrapper `m.div` (scale 1.08 zoom); card entrance via `useInView` + `custom={index}` for 0.08s per-card stagger delay. Accepts optional `images?: Partial<Record<Slug, string>>` prop to override any discipline's image URL.
3. `<WhyTrainHere>` — 3-column value props
4. `<StatCounters>` — animated numbers ("30+ classes/week", "100+ 5-star reviews")
5. `<TestimonialMarquee>` — looping horizontal carousel
6. SEO prose block (server-rendered paragraphs)
7. `<FaqSection>` — 6 FAQs from HOME_FAQ_IDS
8. `<LeadForm source="home-below-fold">` — lead capture

### `/classes` — Programs Hub (`app/classes/page.tsx`)
Lists all 7 disciplines with description + link. BreadcrumbList JSON-LD.

### `/classes/[discipline]` — 7 Class Pages
All use `ClassPageTemplate`. Routes:
- `brazilian-jiu-jitsu`, `muay-thai`, `mma`, `womens-bjj`, `kids`, `open-mat`, `strength-conditioning`

Each has discipline-specific copy, 10–15 FAQs, Course + FAQPage + BreadcrumbList JSON-LD, `buildClassPageMetadata()`.

### `/schedule` (`app/schedule/page.tsx`)
`<WeeklySchedule>` with filter chips. Event JSON-LD for each of 30 classes.

### `/book` (`app/book/page.tsx`)
`<CoachSchedulingCard>` — the primary free trial booking flow.
Step 1: choose discipline → Step 2: pick date + time → Step 3: firstName, lastName, phone → `submitBooking()` server action.

**Hardcoded free trial slots:** Muay Thai = Mondays 5:30 PM | BJJ = Thursdays 7:30 PM

### `/free-trial` (`app/free-trial/page.tsx`)
Still renders a `<LeadForm>` but is permanently redirected to `/book` via `next.config.ts` — effectively unreachable.

### `/contact` (`app/contact/page.tsx`)
Address, phone, hours from WEEKLY_SCHEDULE, Google Maps iframe, "What to Expect", `<LeadForm source="contact">`.

### `/about` (`app/about/page.tsx`)
Gym story, facility, Mission Empower nonprofit. LocalBusiness + MartialArtsSchool + NGO + BreadcrumbList JSON-LD.

### `/faq` (`app/faq/page.tsx`)
All 17 FAQ items. FAQPage JSON-LD.

### `/instructors` (`app/instructors/page.tsx`)
**Placeholder.** "Coming soon." No coach data. Phase 2.

---

## Key Components

### `components/ui/coach-scheduling-card.tsx` (Client)
Multi-step booking UI. State: `discipline → date/time → form → confirmation`.
- No props — self-contained
- Submits to `submitBooking()` server action
- Fields: firstName, lastName, phone
- Calendar only shows Mondays (Muay Thai) or Thursdays (BJJ) as available
- Coach avatar: `public/said.jpg` (photo of gym owner Said Hatim)

### `components/forms/lead-form.tsx` (Client)
Props: `source: string`, `defaultInterest?: string`, `variant?: "standard" | "compact"`
- `standard`: firstName + lastName required
- `compact`: lastName optional (filled with "—" if empty)
- Submits to `submitLead()` server action
- Success → green checkmark + form resets. Error → red alert.

### `components/forms/conversion-tracking.tsx` (Client)
Invisible component. Polls for `window.fbq` + `window.gtag`, fires `fbq("track","Lead")` and `gtag("event","generate_lead")`. Times out after 5s. Place on confirmation pages only.

### `components/layout/site-header.tsx` (Client)
Desktop: nav + "Book Free Trial" red button + phone. Mobile: hamburger → Sheet drawer + sticky CTA. All booking CTAs → `/book`.

### `components/layout/sticky-mobile-cta.tsx` (Client)
Fixed bottom button on mobile. Appears at 400–500px scroll depth. Respects `prefers-reduced-motion`.

### `components/sections/class-page-template.tsx`
Shared layout for all 7 discipline pages: hero → description → schedule → FAQ → LeadForm CTA.

### `components/schedule/weekly-schedule.tsx` (Client)
Day-column grid. Filter chips at top. Powered by `WEEKLY_SCHEDULE`. Color-coded by `DISCIPLINE_COLORS`.

---

## Library & Data Files

### `lib/schedule.ts`
```typescript
type Discipline =
  | "muay-thai" | "bjj-no-gi" | "bjj-gi"
  | "womens-bjj" | "kids-muay-thai" | "kids-bjj"
  | "strength" | "open-mat" | "sparring" | "open-weight";

interface ScheduleEntry {
  day: "Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday";
  time: string;         // 24h "17:30"
  displayTime: string;  // "5:30 PM"
  name: string;
  discipline: Discipline;
  durationMinutes: number;
  audience: "adult" | "kids" | "all";
}
// 30 entries, Mon–Sat. Sunday closed.
// Free trial slots: Monday 17:30 (Muay Thai), Thursday 19:30 (BJJ Gi)
```

### `lib/faq-data.ts`
17 `FaqItem` objects. Categories: `general`(7), `bjj`(3), `muay-thai`(2), `kids`(1), `membership`(3).
`HOME_FAQ_IDS` = 6-item subset shown on home page.

### `lib/schema.tsx`
`GYM` constant = single source of truth for gym identity (name, URL, address, geo, phone, email, socials).
Builders: `buildLocalBusiness()`, `buildCourse()`, `buildFaqPage()`, `buildBreadcrumbList()`, `buildPerson()`, `buildScheduleEvent()`, `buildAggregateRatingWithReviews()`.
Renderer: `<JsonLdScript data={...} />`.

### `lib/seo.ts`
```typescript
buildMetadata({ title, description, path, keywords, absoluteTitle? }): Metadata
buildClassPageMetadata({ discipline, title, description, keywords }): Metadata
```

### `lib/motion.ts`
```typescript
EASE_MISSION = [0.16, 1, 0.3, 1]
DURATION = { fast: 0.25, base: 0.5, slow: 0.6, hero: 0.7 }
// Variants: FADE_UP, FADE_IN, SLIDE_UP, STAGGER_CONTAINER, STAGGER_FAST, SCALE_HOVER
```
**Always use `m.div` etc., not `motion.div`** — root layout uses `<LazyMotion strict>`.

### `lib/lead-schema.ts`
```typescript
LeadInputSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName:  z.string().min(1).max(80),
  phone:     z.string().regex(/^[\d\s().+\-]{10,20}$/),
  interest:  z.string().optional(),
  source:    z.string().optional(),
})
// Canonical phone validator — reuse for any new phone field.
```

---

## Server Actions

### `app/actions/submit-lead.ts`
1. Validate with `LeadInputSchema`
2. Normalize phone to E.164 (`+1XXXXXXXXXX`)
3. POST to `process.env.N8N_WEBHOOK_URL` (server-only, 6s timeout)
4. Return `{ success: true }` or `{ success: false, error: string }`

Payload: `{ firstName, lastName, phone, interest, source }`

### `app/actions/submit-booking.ts`
Same pattern. Fields: firstName, lastName, phone, selectedDate, selectedClass, selectedTime. Appends `source: "booking-page"`.

---

## Redirects

### In `next.config.ts` (case-insensitive, permanent 308)
| From | To |
|---|---|
| `/free-trial` | `/book` |
| `/free-trial/thank-you` | `/book` |
| `/classes/Muay-Thai-Kickboxing` | `/classes/muay-thai` |
| `/classes/Kids-Jiu-Jitsu` | `/classes/kids` |
| `/classes/Kids-Muay-Thai` | `/classes/kids` |
| `/classes/Womens-Brazilian-Jiu-Jitsu` | `/classes/womens-bjj` |
| `/classes/Fitness` | `/classes/strength-conditioning` |
| `/classes/Private-Lessons` | `/contact` |
| `/classes/Mission-Empower` | `/about` |
| `/classes/Training-with-Head-Coach` | `/contact` |
| `/Home/Schedule` | `/schedule` |
| `/Home/Reviews` | `/` |
| `/FAQ` | `/contact` |
| `/Home/Offer` | `/free-trial` |
| `/Gallery` | `/about` |
| `/blog` | `/` |

### In `middleware.ts` (case-sensitive — avoids self-redirect loops)
| From | To |
|---|---|
| `/classes/Brazilian-Jiu-Jitsu` | `/classes/brazilian-jiu-jitsu` |
| `/classes/MMA` | `/classes/mma` |
| `/Contact` | `/contact` |

**Critical rule:** If `source.toLowerCase() === destination`, put the rule in `middleware.ts`, NOT `next.config.ts`. Next.js redirects are case-insensitive and will cause an infinite loop.

---

## Environment Variables (`.env.local`)

```env
N8N_WEBHOOK_URL=                      # Server-only. Lead + booking webhook.
NEXT_PUBLIC_SITE_URL=https://missionmmachicago.com
NEXT_PUBLIC_META_PIXEL_ID=643275415764341
NEXT_PUBLIC_GA4_ID=                   # Empty until GA4 property created.
NEXT_PUBLIC_N8N_BOOKING_URL=          # Legacy — superseded by server action.
```

---

## Design System

### Brand Colors (dark theme enforced — no light mode)
```css
--mission-red:      #C8102E
--mission-black:    #0A0A0A
--mission-white:    #F5F5F5
--mission-gray-900: #1A1A1A
--mission-gray-700: #3D3D3D
--mission-gray-500: #737373
--mission-gray-300: #D4D4D4
```
The `<html>` element always has `.dark`. All styling is dark-first.

### Typography
- **Display (headings):** Oswald — uppercase, tight tracking, weight 400–700
- **Body:** Inter — normal case, variable font

### Framer Motion Rules
- Use `m.*` not `motion.*` (LazyMotion strict mode)
- Variant objects need `as const` for TypeScript strict mode
- Never animate the LCP element
- Always respect `prefers-reduced-motion`
- Only animation-containing leaves are `"use client"` — server components stay server

---

## Critical Lessons

**1. Next.js redirect self-loop** — `source.toLowerCase() === destination` causes infinite 308. Use `middleware.ts` for those rules.

**2. /free-trial → /book** — `/book` is canonical. All CTAs point there. Booking webhook is server-side (`N8N_WEBHOOK_URL`), not `NEXT_PUBLIC_`.

**3. Phone, not email, in booking form** — downstream stack (VAPI, Twilio, n8n) is phone-first. Use `lib/lead-schema.ts` phone regex for any new phone field.

**4. Framer Motion variants need `as const`** — required for TypeScript strict mode.

**5. ConversionTracking polls for trackers** — analytics scripts load after hydration. Component polls up to 5s. Mount on confirmation pages only.

**6. shadcn nova preset has no Form component** — add manually: `npx shadcn add form`.

**7. Pexels image URLs** — use `images.pexels.com/photos/ID/...` not the pexels.com page URL.

---

## Known Gaps / TODO

1. **`/instructors`** — placeholder. No coach data, photos, or bios. Phase 2.
2. **GA4** — `NEXT_PUBLIC_GA4_ID` empty. No GA4 property yet.
3. **OG image** — `public/og-image.jpg` doesn't exist. `lib/seo.ts` references it.
4. **Content markdown files** — `bjj.md`, `muay-thai.md`, etc. at project root are drafts, not integrated into any page.
5. **ConversionTracking** — component built but not placed on any page yet.
6. **Instructor dynamic pages** — `app/instructors/[slug]/page.tsx` exists with no data source.

---

## Data Flow Summaries

### Booking
User → `/book` → CoachSchedulingCard (discipline → date → time → form) → `submitBooking()` server action → n8n webhook → Google Sheets + Twilio SMS

### Lead Form
User → any page with LeadForm → fills firstName, lastName, phone → `submitLead()` server action → normalize phone to E.164 → n8n webhook → Google Sheets + Twilio SMS

---

## CLAUDE.md Instructions (apply every session)
1. Read all files in `docs/lessons/` before planning or editing anything.
2. After any non-trivial fix or logic change, write a new `docs/lessons/YYYY-MM-DD-short-description.md`.
3. After any change to the website, update `HANDOFF-GUIDE.md` to reflect current state.
4. Keep the GitHub repo in sync with local changes.
