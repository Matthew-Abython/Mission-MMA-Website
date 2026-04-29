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
| Animation | Framer Motion (LazyMotion **domMax**) | — |
| Scroll | Lenis v2 (`lenis/react` ReactLenis root) | — |
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
│   ├── providers/
│   │   └── lenis-provider.tsx      # Lenis smooth scroll (lerp:0.1; lerp:1 for reduced-motion)
│   ├── motion/
│   │   ├── animated-counter.tsx    # Scroll-triggered number counter
│   │   ├── parallax-section.tsx    # Wrapper: useScroll → y offset (speed prop, ±80px max)
│   │   ├── parallax-text.tsx       # Velocity marquee (useVelocity+useSpring, opacity 0.06 default)
│   │   └── particle-field.tsx      # CSS-only floating particle system (server component)
│   ├── schedule/
│   │   └── weekly-schedule.tsx     # Filterable 7-day class grid
│   ├── sections/
│   │   ├── class-page-hero.tsx     # 70vh discipline hero with 3-layer parallax (image/gradient/text)
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
│       ├── 2026-04-28-css-var-in-keyframes.md
│       ├── 2026-04-28-framer-motion-border-scale-propagation.md
│       ├── 2026-04-28-layoutid-requires-dommax.md
│       ├── 2026-04-28-lenis-framer-motion-integration.md
│       ├── 2026-04-28-parallax-image-overflow-buffer.md
│       ├── 2026-04-28-marquee-hover-pause-css-vs-waapi.md
│       ├── 2026-04-28-marquee-wrap-direction-math.md
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
4. `<StatCounters>` — 4-col grid (2-col mobile): 30+ Weekly Classes | 100+ 5-Star Reviews | 7 Disciplines | 10+ Years Experience. Background `#111111` + SVG `feTurbulence` fractalNoise grain at 2% opacity + `ParallaxText` "MISSION MMA" watermark behind. Each card: `AnimatedCounter` at Oswald 80px white + red suffix, yellow ★ decoration (reviews), Inter 16px gray-300 label, red bottom border that scaleX expands from `origin-center` via BORDER_VARIANTS propagated from STAGGER_FAST → CARD_VARIANTS → BORDER_VARIANTS (0.4s delay trails the number).
5. `<TestimonialMarquee>` — two-row infinite marquee. Row 1 scrolls left, Row 2 scrolls right (reversed review order). CSS `@keyframes marquee-left/right` (in globals.css) + React `useState` for hover-pause (`animationPlayState: "paused"`). Cards: 300px wide, #1A1A1A bg, `rgba(200,16,46,0.2)` border, 16px radius, 24px padding; yellow ★★★★★, Inter 15px italic quote, Oswald 14px red name. Edge-fade via `mask-image` linear-gradient. Duplicated array for seamless −50% loop.
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

### `components/motion/particle-field.tsx` (Server)
Wraps children in `position:relative overflow:hidden` and renders 20 CSS-animated red circles behind them. No JS — pure `@keyframes particle-drift` defined in `globals.css`. Each particle has `--p-opacity` inline CSS variable read by the keyframe for per-particle peak opacity (0.3–0.6). `animation-fill-mode: backwards` keeps particles invisible during their delay. `Math.random()` not used — 20 hand-placed configs avoid hydration mismatch. `prefers-reduced-motion` handled by the global `animation-duration: 0.01ms` rule.

Usage: `<ParticleField className="...">` — pass the section's own classes; the wrapper adds `relative overflow-hidden` automatically.

### `components/motion/parallax-section.tsx` (Client)
Wraps any children in a scroll-driven y-offset. Props: `speed` (default 0.3, maps to ±24px; 1.0 = ±80px), `className`. Uses `useScroll({ target: ref, offset: ["start end","end start"] })` + `useTransform`. Passes `y: 0` when `useReducedMotion` is true.

### `components/motion/parallax-text.tsx` (Client)
Infinite horizontal marquee at Oswald `clamp(80px,10vw,140px)`. Props: `text`, `speed` (default 5, in %/s), `direction` ("left"|"right"), `color` (default "white"), `opacity` (default 0.06). Uses `useVelocity` + `useSpring` to add scroll-momentum boost (never reverses base direction). Wrap math: both directions use a 25%-window wrap in `[-25%,0%]`; rightward starts at -25% offset so the loop is seamless. `aria-hidden="true"` — decorative only. All motion disabled when `useReducedMotion` is true.

### `components/layout/site-header.tsx` (Client)
Sticky header with scroll-driven background. Features:
- **Scroll bg**: `AnimatePresence` mounts a blurred dark layer (`rgba(10,10,10,0.95)`, `backdrop-filter: blur(20px) saturate(180%)`) when `scrollY > 80` via `useMotionValueEvent`. Base layer is always-on `from-black/50` gradient for legibility.
- **Logo scale**: `m.div` spring-animates to `scale: 0.85` on scroll (stiffness 400, damping 30), `originX: 0` keeps it left-aligned.
- **Active nav underline**: `m.span layoutId="nav-underline"` slides between active `PRIMARY_NAV` items. **Requires `domMax`** in `LazyMotion` (upgraded from `domAnimation` for this feature).
- **Desktop CTA**: "Free Trial" button has `cta-pulse` CSS @keyframes (box-shadow ring, 2s loop, defined in globals.css). Skipped when `useReducedMotion`.
- **Hamburger icon**: Three `m.path` SVG elements animate bars → X using `rotate` + `y` Framer Motion transforms with `transformBox: fill-box, transformOrigin: center` for correct SVG pivot. Reduced motion falls back to instant Lucide `Menu`/`X` icon swap.
- **Mobile Sheet**: nav links wrapped in `m.nav` with custom 50ms stagger container + `FADE_UP` per link. Stagger fires fresh on each open (Sheet unmounts when closed).

All animations skip (static values) when `useReducedMotion` is true.

### `components/layout/sticky-mobile-cta.tsx` (Client)
Fixed bottom button on mobile. Appears at 400–500px scroll depth. Respects `prefers-reduced-motion`.

### `components/sections/class-page-hero.tsx` (Client)
Props: `title`, `subtitle?`, `imageSrc`, `imageAlt?`, `breadcrumbs?: Breadcrumb[]`, `ctaText?` (default "Book Free Trial"), `ctaHref?` (default "/book").

Three-layer parallax via `useScroll({ target, offset: ["start start","end start"] })`:
- Layer 1 image: `y=[0,80]` (slowest, image wrapper at `top:-80px h-[130%]` to prevent top-edge gap)
- Layer 2 gradient: `y=[0,40]` (medium; dark-right gradient + diagonal red tint at 10% opacity)
- Layer 3 text: `y=[0,20]` (barely moves)

Decorations: 4px solid red left accent bar (z-30), top-left triangle via `clip-path: polygon(0 0, 100% 0, 0 100%)` at 8% mission-red opacity. Title: `clamp(48px,8vw,80px)` letter-spacing `-3px`. All y values become `0` when `useReducedMotion` is true.

### `components/sections/class-page-template.tsx`
Shared layout for all 7 discipline pages: hero → description → schedule → FAQ → LeadForm CTA. Passes `breadcrumbs=[{Classes,/classes},{title}]` to `ClassPageHero`.

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
3. ~~**OG image**~~ — ✅ **DONE** — `app/opengraph-image.tsx` generates a dynamic 1200×630 OG image at request time via `next/og`. `lib/seo.ts` updated to reference `/opengraph-image`.
4. **Content markdown files** — `bjj.md`, `muay-thai.md`, etc. at project root are drafts, not integrated into any page.
5. ~~**ConversionTracking**~~ — ✅ **DONE** — `<ConversionTracking />` added to `CoachSchedulingCard` confirmation step (`submitSuccess === true`). Fires `fbq("track","Lead")` + `gtag("event","generate_lead")` after `/book` form submits successfully.
6. **Instructor dynamic pages** — `app/instructors/[slug]/page.tsx` exists with no data source.
7. **Real gym photos** — Program grid uses Pexels placeholders; hero has no video. See `TODO` comments in `app/page.tsx` above `<HeroGeometric />` and `<ProgramGrid />`.

---

## Visual Enhancement Layer

All components added or rebuilt during the UI upgrade session (2026-04-28):

| Component | Status | Notes |
|---|---|---|
| `components/sections/hero-geometric.tsx` | Rebuilt | CSS mesh hero: orbiting red/dark blobs, scanline, staggered STAGGER_CONTAINER reveal, scroll-fading chevron, optional `videoUrl` prop |
| `components/sections/program-grid.tsx` | Rebuilt | Bento grid: 2 featured (16/9) + 5 small (4/3) cards, whileHover variant propagation for image zoom, per-card stagger via `custom={index}` |
| `components/motion/parallax-section.tsx` | New | Scroll-driven y-offset wrapper; `speed` prop (0–1 → ±80px); `useReducedMotion` gate |
| `components/motion/parallax-text.tsx` | New | Kinetic ghost text marquee; `useVelocity` + `useSpring` momentum; bidirectional 25%-wrap loop |
| `components/motion/particle-field.tsx` | New | CSS-only (server component); 20 static red particles; `@keyframes particle-drift`; `--p-opacity` CSS var per element |
| `components/sections/testimonial-marquee.tsx` | Rebuilt | Two-row infinite marquee; `@keyframes marquee-left/right`; `animationPlayState` hover pause; edge mask |
| `components/sections/stat-counters.tsx` | Rebuilt | SVG `feTurbulence` noise bg; `ParallaxText` watermark; border `scaleX` 0→1 via BORDER_VARIANTS propagation |
| `components/sections/class-page-hero.tsx` | Rebuilt | 3-layer parallax (image +80px / gradient +40px / text +20px); left accent bar; triangle clip-path; breadcrumbs prop |
| `components/layout/site-header.tsx` | Rebuilt | Frosted-glass scroll bg; `layoutId="nav-underline"`; logo spring scale; SVG hamburger→X morph; mobile sheet stagger |
| `components/providers/lenis-provider.tsx` | New | Lenis smooth scroll (`lerp: 0.1`); `lerp: 1` for `prefers-reduced-motion`; wraps all content in root layout |
| `app/opengraph-image.tsx` | New | Dynamic 1200×630 OG image via `next/og`; Oswald loaded from Google Fonts CDN; matches hero aesthetic |

**globals.css keyframes added:** `orbit1`, `orbit2`, `glow-pulse`, `chevron-bounce`, `marquee-left`, `marquee-right`, `cta-pulse`, `particle-drift`

**LazyMotion upgraded** from `domAnimation` → `domMax` to support `layoutId` layout animations.

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
