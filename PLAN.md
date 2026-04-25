# Mission MMA & Fitness — Website Build Plan

> Final consolidated plan for the rebuild of [missionmmachicago.com](https://missionmmachicago.com/). Lean scope: website only, no CRM, no CMS, no blog. Built in **Antigravity** with **21st.dev** + **Magic MCP** for visual components.

---

## Table of Contents

1. [Goals](#1-goals)
2. [Out of Scope](#2-whats-explicitly-out-of-scope)
3. [Stack](#3-stack)
4. [Information Architecture](#4-information-architecture)
5. [The Weekly Schedule](#5-the-weekly-schedule)
6. [The Lead Form](#6-the-lead-form)
7. [SEO + AIO Strategy](#7-seo--aio-strategy)
8. [Visual Design System](#8-visual-design-system)
9. [Animation System](#9-animation-system-framer-motion)
10. [Build Phases](#10-build-phases-7-working-days)
11. [Assets Needed](#11-assets--info-needed-from-you)
12. [Environment Variables](#12-environment-variables)
13. [Success Metrics](#13-success-metrics)

---

## 1. Goals

1. **Lead capture.** One form, three fields (First Name, Last Name, Phone), POSTed to an n8n webhook for downstream SMS follow-up automation.

2. **SEO — two parallel tracks:**
   - **Category authority.** Rank for general Chicago martial arts queries (*martial arts Chicago*, *martial arts near me*, *martial arts gym Chicago*, *martial arts West Loop*). Position Mission MMA as a serious martial arts institution.
   - **Discipline quality.** Rank for high-intent quality queries — *"best Muay Thai Chicago,"* *"best Brazilian jiu jitsu Chicago,"* *"high quality BJJ instruction Chicago,"* *"legitimate Muay Thai gym Chicago."* These are the queries that produce trial bookings.

3. **AIO / GEO — two parallel tracks:**
   - **Category citations.** Be cited when someone asks ChatGPT, Perplexity, Google AI Overviews, Gemini, or Claude *"best martial arts gym in Chicago,"* *"where to learn martial arts in Chicago."*
   - **Discipline citations.** Be cited for *"best Brazilian jiu jitsu Chicago,"* *"top Muay Thai gym Chicago,"* and the same queries phrased with every common spelling variant ("BJJ," "jiu jitsu," "jiu-jitsu," "jujitsu," "thai boxing").

4. **Visual quality.** Look and feel like a premium combat sports facility, not a template.

### What "high quality" means in the content

For LLMs to cite Mission MMA as a *high-quality* Muay Thai or BJJ school, the site has to make pedigree explicit. Every discipline page and every instructor page surfaces:

- **Lineage.** For BJJ: black belt under [Professor], lineage to [founder]. For Muay Thai: camp/gym/trainer of origin, competition record.
- **Credentials.** Belt rank, years training, certifications, where they competed.
- **Methodology.** How classes are structured, how technique is taught, how live training is run safely.
- **Outcomes.** Member promotions, competition results, alumni who went on to compete. Real names, real dates.

Generic claims ("expert coaching," "world-class training") are filtered out by LLMs. Specific, verifiable facts get cited.

## 2. What's Explicitly Out of Scope

- HubSpot or any CRM integration
- Cal.com or any embedded booking
- Sanity or any CMS — schedule and copy live in the repo as typed data
- Blog / blog routes
- Email sequences, pricing pages, member portals
- Gated lead magnets, downloadable PDFs

Anything cut here can be added later without architectural rework.

## 3. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Server-rendered HTML is non-negotiable for SEO and AIO. LLMs cite static prose, not client-rendered JSX. |
| Styling | **Tailwind CSS + shadcn/ui** | Clean primitives. 21st.dev components drop in cleanly. |
| Animation | **Framer Motion** ✅ already installed | Hero reveals, scroll-triggered sections, schedule layout animations, form transitions, parallax, stat counters. Full inventory in `docs/ANIMATION-PLAYBOOK.md`. |
| Components | **21st.dev + Magic MCP** | Pulled into `components/magic/`. Visual polish layer. |
| Form | **React Hook Form + Zod → n8n webhook** | Three fields, one server action, no database. |
| Icons | **Lucide** | Already shadcn default. |
| Images | **Next.js Image + Cloudinary** | Inherit existing `display97` Cloudinary library, optimized delivery. |
| Hosting | **Vercel** | Zero-config Next.js, free tier ample for a gym site. |
| Repo | `Mission-MMA-Website` on GitHub | Built in **Antigravity**, not VS Code. |

**No database. No auth. No backend services.** The site is a static marketing surface with one outbound webhook call.

## 4. Information Architecture

```
/                              Home
/classes                       Programs hub (links to all 7)
  /brazilian-jiu-jitsu
  /muay-thai
  /mma
  /womens-bjj
  /kids
  /open-mat
  /strength-conditioning
/schedule                      Interactive weekly grid
/instructors                   Coach roster (critical for AIO)
  /[slug]                      Individual instructor pages
/about                         Gym story, facility, Mission Empower
/contact                       Map, hours, phone, form
/free-trial                    Dedicated lead-capture landing page
/free-trial/thank-you          Confirmation page
```

**Why 10+ pages and not fewer:** Each class discipline is its own search-intent cluster. Collapsing them into one "Classes" page means ranking for nothing. Each class page targets a specific query and carries its own FAQ, schema, and prose — which is also what LLMs cite from.

### Class page template (used 7×)

1. Hero — H1 with primary keyword, single CTA
2. What you'll learn — 3–5 concrete outcomes
3. Who this is for — beginner / intermediate / experienced
4. What a class looks like — demystify the experience
5. **What sets our instruction apart** — quality signal section (lineage, methodology, outcomes)
6. Instructor callout — named coach(es)
7. Schedule snippet — filtered to this discipline
8. FAQ — 8–10 questions with FAQPage schema
9. Lead form — contextual, pre-fills the discipline as `interest`

## 5. The Weekly Schedule

Schedule is identical every week, so it's not dynamic data — it's a typed constant in the repo. Edit the file, commit, ship.

- **Data file:** `lib/schedule.ts` — pre-populated. See `docs/schedule-data.md` for the ready-to-paste TypeScript.
- **Component:** `<WeeklySchedule />` — 7-column grid (Mon–Sun) on desktop, vertical day-by-day stack on mobile. Filter chips ("All / BJJ / Muay Thai / Kids / Women's / Strength"). Each class wrapped in `Event` JSON-LD.
- **Total:** 30 classes per week across Mon–Sat. Sunday closed.

### Discipline color coding

| Discipline | Treatment |
|---|---|
| Muay Thai | Red `#C8102E` |
| BJJ (Gi & No-Gi) | White / gray |
| Women's BJJ | Red outlined |
| Kids | Gray |
| Strength & Conditioning | Gray outlined |
| Open Mat | White outlined |
| Sparring | Deep red |

## 6. The Lead Form

Three fields. That's the entire form.

```
┌─────────────────────────────┐
│  Claim Your Free Class       │
├─────────────────────────────┤
│  First Name    [__________] │
│  Last Name     [__________] │
│  Phone         [__________] │
│                              │
│         [  Get Started  ]    │
└─────────────────────────────┘
```

**Submission flow:**

```
User submits
  → Next.js server action (app/actions/submit-lead.ts)
  → Zod validates (phone format, non-empty names)
  → fetch() POST to process.env.N8N_WEBHOOK_URL
  → Success: redirect to /free-trial/thank-you
  → Error: inline error, form keeps values
```

**Where the form appears:**
- Home page (above footer)
- Every class page (contextual — `defaultInterest` prop pre-fills hidden field)
- `/contact`
- `/free-trial` (primary placement, above fold)
- Footer (mini variant — first name + phone only)

**n8n payload shape:**

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+13125551234",
  "interest": "brazilian-jiu-jitsu",
  "source": "class-page-bjj",
  "submittedAt": "2026-04-24T18:30:00.000Z"
}
```

Until the n8n workflow exists, `N8N_WEBHOOK_URL` points at `webhook.site` for testing. Swap the env var when n8n is live — no code change.

## 7. SEO + AIO Strategy

**SEO** = Google rankings. **AIO / GEO** = being cited by ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude. Same technical foundation, but AIO has a few extra moves.

Full tactical detail lives in `docs/AIO-PLAYBOOK.md`. Highlights below.

### Shared foundation

- Server-rendered HTML on every page
- Clean, descriptive `<h1>` per page
- Entity-rich opening paragraph: gym name, address, neighborhood, disciplines, coach names
- Consistent NAP (Name, Address, Phone) — must match Google Business Profile exactly
- Fast Core Web Vitals (LCP < 2.0s)
- Mobile-first responsive
- Semantic HTML
- Descriptive internal linking

### Keyword strategy summary

Two layers per page: **category authority** (general martial arts intent) + **discipline quality** (specific intent for serious learners). Every BJJ-mentioning page uses all five spelling variants (BJJ, jiu jitsu, jiu-jitsu, brazilian jiu jitsu, jujitsu). Every Muay Thai page uses all three (muay thai, thai boxing, muay thai kickboxing).

| Page | Primary | Variants + Quality |
|---|---|---|
| Home | mma gym chicago | martial arts chicago, martial arts west loop, best martial arts chicago |
| BJJ | brazilian jiu jitsu chicago | bjj/jiu jitsu/jiu-jitsu/jujitsu chicago, best brazilian jiu jitsu chicago, high quality jiu jitsu instruction chicago |
| Muay Thai | muay thai chicago | thai boxing chicago, muay thai kickboxing chicago, best muay thai chicago, legitimate muay thai instruction chicago |
| Women's BJJ | womens brazilian jiu jitsu chicago | womens bjj/jiu jitsu chicago, best womens jiu jitsu chicago |
| MMA | mma classes chicago | mixed martial arts chicago, best mma gym chicago |
| Kids | kids martial arts chicago | kids muay thai/bjj/jiu jitsu chicago |
| Open Mat | bjj open mat chicago | jiu jitsu open mat chicago, womens open mat chicago |
| Strength | strength and conditioning chicago | martial arts strength training chicago |

**Spelling-variant rule:** Pages weave variants in *naturally* across H1, H2s, body, and FAQs. The pattern:

> *"At Mission MMA & Fitness, our Brazilian Jiu-Jitsu program (commonly called BJJ or jiu jitsu) teaches both Gi and No-Gi… Whether you're searching for jiu-jitsu classes in the West Loop or just learning what jujitsu is, we offer a free trial."*

Captures five spelling intents in one paragraph without keyword-stuffing.

### Structured data (JSON-LD)

Every relevant page ships with structured data:

- **Site-wide:** `LocalBusiness` + `MartialArtsSchool`
- **Class pages:** `Course` + `FAQPage` + `BreadcrumbList`
- **Instructor pages:** `Person` with credentials, lineage, sameAs
- **Schedule:** `Event` for each recurring class
- **Home + class pages:** `AggregateRating` + `Review`

### AIO-specific (full detail in `docs/AIO-PLAYBOOK.md`)

- `llms.txt` at root — gym summary optimized for LLM ingestion
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.
- Entity-dense first paragraphs with spelling variants and quality signals
- Instructor pages with explicit lineage chains
- Comparison-friendly framing in class page copy
- Specific verifiable facts (real numbers, dates, belt ranks) — generic claims get filtered out

## 8. Visual Design System

### Brand tokens

```css
--mission-red:        #C8102E;
--mission-black:      #0A0A0A;
--mission-white:      #F5F5F5;
--mission-gray-900:   #1A1A1A;
--mission-gray-700:   #3D3D3D;
--mission-gray-500:   #737373;
--mission-gray-300:   #D4D4D4;
```

### Typography

- **Display:** Oswald (700, 800) — compressed, industrial, matches logo
- **Body:** Inter (400, 500, 600)

### Component inventory (21st.dev / Magic MCP)

| Section | Source | Notes |
|---|---|---|
| Home hero | 21st.dev | Video hero with gradient overlay, centered logo, single CTA |
| Program grid | Magic MCP | Bento grid, hover reveal, 7 tiles |
| Why-train-here | Magic MCP | 4-up feature cards with icons |
| Testimonial marquee | 21st.dev | Infinite scroll, real Google reviews |
| Schedule grid | Custom + shadcn | 7-column desktop, stacked mobile, filter chips |
| Instructor cards | shadcn + Framer | Hover flip / mobile tap-to-reveal |
| Lead form | shadcn Form | RHF + Zod, 3 fields |
| FAQ accordion | shadcn Accordion | + FAQPage schema wrapper |
| Sticky mobile CTA | Magic MCP | Floating "Book Free Trial" button |
| Footer | Custom | NAP block, sitemap links, mini lead form |

**Rule:** 21st.dev / Magic MCP for the visual layer users interact with. All SEO-critical content (H1s, paragraphs, FAQs, JSON-LD) stays as plain server-rendered HTML.

## 9. Animation System (Framer Motion)

Already installed. Full inventory of every animation, code patterns, and performance guardrails in `docs/ANIMATION-PLAYBOOK.md`. Highlights:

- `LazyMotion` + `m` instead of `motion` to keep bundle ~15KB instead of ~50KB
- Server components stay server components — only animation leaves are `"use client"`
- Custom easing curve `[0.16, 1, 0.3, 1]` (`EASE_MISSION`) used site-wide
- 15 cataloged animations across hero, schedule, forms, instructor cards, page transitions
- `prefers-reduced-motion` respected everywhere
- No animation on the LCP element

## 10. Build Phases (7 working days)

### Phase 0 — Foundation (Day 1)
- Create GitHub repo `Mission-MMA-Website`
- Scaffold Next.js 15 + Tailwind + shadcn in Antigravity
- ~~Install Framer Motion~~ ✅ already installed
- Install React Hook Form, Zod, Lucide
- Verify 21st.dev + Magic MCP available in Antigravity
- Configure brand tokens in `tailwind.config.ts`
- Wrap `app/layout.tsx` with `<LazyMotion features={domAnimation} strict>`
- Create `lib/motion.ts` with shared variants and `EASE_MISSION` curve
- Connect Vercel, set up preview deployments

### Phase 1 — Routes & SEO Skeleton (Day 2)
- All 10+ routes scaffolded with placeholder content
- Root layout with metadata, fonts, Meta Pixel, GA4
- `lib/schema.ts` — JSON-LD builders for all schema types
- `lib/schedule.ts` — paste from `docs/schedule-data.md`
- `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`
- 301 redirects in `next.config.ts`

### Phase 2 — Visual Build (Days 3–5)
- Home hero (21st.dev) with framer-motion stagger reveal
- Program bento grid (Magic MCP) with hover lift
- `<WeeklySchedule />` with `LayoutGroup` filter animations
- Class page template + all 7 class pages with real copy
- Class hero parallax (`useScroll` + `useTransform`)
- Stat counters with `<AnimatedCounter />`
- Instructor cards with hover flip / mobile tap-to-reveal
- Testimonial marquee with real reviews
- Page transitions via `app/template.tsx`
- Mobile polish + reduced-motion verification

### Phase 3 — Lead Form (Day 6)
- `<LeadForm />` with RHF + Zod
- Field validation + submit button morph (framer-motion)
- `app/actions/submit-lead.ts` server action → n8n webhook
- Form placements across Home, class pages, Contact, Free Trial, Footer
- `/free-trial/thank-you` confirmation page
- Sticky mobile CTA with scroll-driven appearance

### Phase 4 — Launch (Day 7)
- Lighthouse pass — target ≥95 on all four metrics
- Schema validation via Google Rich Results Test
- AI crawler verification (`robots.txt` + `llms.txt` review)
- Domain swap to `missionmmachicago.com`
- Submit sitemap to Google Search Console
- Verify Meta Pixel + GA4 firing in production
- First AIO citation audit

## 11. Assets & Info Needed From You

- [ ] **Logo in SVG format** (we have the PNG)
- [ ] **15–30 sec of gym training footage** for the home hero video (MP4)
- [ ] **6–10 high-quality photos** of facility, classes, and instructors
- [ ] **Instructor names + credentials** (belt rank, lineage, years training, fight records, certifications) — bullet points fine, we polish into prose
- [ ] **Confirm 6 testimonials** to feature (Ricardo H., Jackie V., Kimmy P., Jae R., Edirin I., Jessica S. all already on existing site)
- [ ] **n8n webhook URL** when ready (use `webhook.site` placeholder until then)
- [ ] **Domain registrar access** at launch
- [ ] **Google Business Profile access** post-launch for GSC verification
- [ ] **Mission Empower details** — confirm wording for the About page mention

## 12. Environment Variables

```env
# .env.local

# n8n webhook for lead form submissions
N8N_WEBHOOK_URL=https://webhook.site/REPLACE-WITH-YOUR-UUID

# Site URL (used for canonical URLs, sitemap, OG tags)
NEXT_PUBLIC_SITE_URL=https://missionmmachicago.com

# Analytics
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=643275415764341
```

The Meta Pixel ID is inherited from the existing site to preserve audience continuity.

## 13. Success Metrics

Establish baseline from current site before launch, measure 30 / 60 / 90 days post-launch:

| Metric | 90-day target |
|---|---|
| Organic sessions | +40% vs. baseline |
| Lead form submissions | Establish baseline |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| LCP | < 2.0s |
| Ranking for "brazilian jiu jitsu chicago" | Top 5 |
| Ranking for "muay thai chicago" | Top 5 |
| Ranking for "martial arts chicago" | Top 10 |
| AIO citation audit (manual monthly) | Cited by 3+ LLMs for "best mma gym chicago" |
