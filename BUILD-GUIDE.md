# Build Guide — Step-by-Step in Antigravity

> **Phase 3 status (as of 2026-04-27):** ✅ Complete. Lead form live across home, free-trial (with ?interest= deep-linking), all 7 class pages (open-mat excepted), contact, and footer. Real n8n webhook integration verified end-to-end with E.164 phone normalization, 6-second timeout, and graceful error handling. Thank-you page renders with Meta Pixel + GA4 conversion stubs (Pixel script in app/layout.tsx pending, Step 4.6).

This is the executable playbook. Follow phases in order. Each step is sized to be either a copy-paste terminal command or a **"ask me for"** marker meaning come back to Claude chat for the next code drop.

The goal is a deployed website at `missionmmachicago.com` in 7 working days.

---

## Phase 0 — Foundation (Day 1)

### 0.1 — Create GitHub repo

1. Go to https://github.com/new
2. Repository name: `Mission-MMA-Website`
3. Visibility: **Private** (until launch)
4. Leave README, .gitignore, license all unchecked — we create our own
5. Click **Create repository**

In your terminal:
```bash
mkdir Mission-MMA-Website && cd Mission-MMA-Website
git init
git remote add origin git@github.com:YOUR-USERNAME/Mission-MMA-Website.git
```

Open this folder in Antigravity.

### 0.2 — Scaffold Next.js

In Antigravity's terminal, inside the project folder:

```bash
pnpm create next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```

Prompt answers:
- Use ESLint? **Yes**
- Use Turbopack for `next dev`? **Yes**

### 0.3 — Install dependencies

Framer Motion is already installed. Add the rest:

```bash
pnpm add react-hook-form zod @hookform/resolvers lucide-react
```

> Already in your `package.json`: `framer-motion` (4 transitive packages installed alongside it — those are framer-motion's own internals like `motion-dom`, `motion-utils`, `tslib`, and don't need separate handling).

### 0.4 — Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

Prompts:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

Then add the primitives:

```bash
pnpm dlx shadcn@latest add button card form input label accordion dialog sheet tabs badge sonner
```

### 0.5 — Verify 21st.dev + Magic MCP in Antigravity

Open Antigravity's MCP/skills panel. Confirm:

- ✅ 21st.dev is connected
- ✅ Magic MCP is connected

You should be able to see both in the agent's tool list. If not, install/connect them through Antigravity's UI before continuing.

### 0.6 — Brand tokens in Tailwind

**Ask me for:** `tailwind.config.ts` patch with the Mission palette + Oswald + Inter fonts, and the `app/globals.css` CSS variables update.

### 0.7 — Root layout with `LazyMotion`

**Ask me for:** `app/layout.tsx` with:
- `next/font` Oswald + Inter
- Default site metadata (title template, description, OG, Twitter)
- Viewport config
- GA4 + Meta Pixel script tags
- Site-wide `LocalBusiness` JSON-LD
- `<LazyMotion features={domAnimation} strict>` wrapper

### 0.8 — Motion primitives library

**Ask me for:** `lib/motion.ts` (shared variants + `EASE_MISSION`) plus `components/motion/reveal-on-view.tsx` and `components/motion/animated-counter.tsx`.

These are the building blocks for every animation in the site. See `docs/ANIMATION-PLAYBOOK.md` for full spec.

### 0.9 — Commit and push foundation

```bash
git add .
git commit -m "chore: scaffold Next.js, Tailwind, shadcn, framer-motion, brand tokens"
git branch -M main
git push -u origin main
```

### 0.10 — Connect Vercel

1. https://vercel.com/new
2. Import `Mission-MMA-Website`
3. Accept defaults (Next.js detected automatically)
4. Click **Deploy**

Preview URLs fire on every PR automatically. Production deploys on every push to `main`.

### 0.11 — Drop in planning docs

Copy these from the planning bundle into the repo:

```
PLAN.md
README.md
docs/BUILD-GUIDE.md  (this file)
docs/AIO-PLAYBOOK.md
docs/ANIMATION-PLAYBOOK.md
docs/schedule-data.md
docs/redirect-map.csv
docs/content-briefs/bjj.md
docs/content-briefs/muay-thai.md
docs/content-briefs/mma.md
docs/content-briefs/womens-bjj.md
docs/content-briefs/kids.md
docs/content-briefs/open-mat.md
docs/content-briefs/strength-conditioning.md
```

```bash
git add PLAN.md README.md docs/
git commit -m "docs: add full planning bundle"
git push
```

---

## Phase 1 — Routes & SEO Skeleton (Day 2)

### 1.1 — Schema helpers

**Ask me for:** `lib/schema.ts` with typed builders for `LocalBusiness`, `MartialArtsSchool`, `Course`, `FAQPage`, `Person`, `BreadcrumbList`, `Event`, `Review`, `AggregateRating`.

### 1.2 — Schedule data

Create `lib/schedule.ts` and paste the contents from `docs/schedule-data.md`. That's it — schedule is now a typed import.

### 1.3 — SEO helpers

**Ask me for:** `lib/seo.ts` with a `buildMetadata()` helper that generates per-page `<head>` metadata consistently.

### 1.4 — Scaffold all routes

Create page files for every route. Each exports a default component and a `metadata` export. Placeholder content for now.

```
app/page.tsx
app/classes/page.tsx
app/classes/brazilian-jiu-jitsu/page.tsx
app/classes/muay-thai/page.tsx
app/classes/mma/page.tsx
app/classes/womens-bjj/page.tsx
app/classes/kids/page.tsx
app/classes/open-mat/page.tsx
app/classes/strength-conditioning/page.tsx
app/schedule/page.tsx
app/instructors/page.tsx
app/instructors/[slug]/page.tsx
app/about/page.tsx
app/contact/page.tsx
app/free-trial/page.tsx
app/free-trial/thank-you/page.tsx
```

**Ask me for:** the page scaffold template — a single tsx file pattern you copy/paste for every route.

### 1.5 — sitemap, robots, llms.txt

**Ask me for:**
- `app/sitemap.ts` — Next.js dynamic sitemap
- `app/robots.ts` — explicit AI crawler allowlist
- `public/llms.txt` — LLM-optimized gym summary (content lives in `docs/AIO-PLAYBOOK.md`)

### 1.6 — 301 redirects

**Ask me for:** the `next.config.ts` redirects block translating `docs/redirect-map.csv` into Next.js redirect rules.

### 1.7 — Commit Phase 1

```bash
git add .
git commit -m "feat: SEO + motion foundation — routes, schema, sitemap, llms.txt, redirects, motion primitives"
git push
```

Verify the Vercel preview deploys successfully. Hit `/sitemap.xml`, `/robots.txt`, `/llms.txt` to confirm they render.

---

## Phase 2 — Visual Build (Days 3–5)

> Every visual component has a corresponding entry in `docs/ANIMATION-PLAYBOOK.md`. Reference that playbook section number when prompting 21st.dev / Magic MCP so generated components fit the system.

### Day 3 — Home page foundation

#### 2.1 — Home hero (21st.dev + framer-motion)

In Antigravity, prompt the 21st.dev agent:

> *"Full-viewport video hero for a Chicago MMA gym. Centered wordmark logo, single red CTA button 'Claim Your Free Class', gradient overlay from black to transparent, dark aesthetic with a red accent line. Use framer-motion for a stagger reveal of logo → headline → subhead → CTA on mount. Accept video URL as a prop."*

Save to `components/sections/home-hero.tsx`. Use `STAGGER_CONTAINER` and `FADE_UP` from `lib/motion.ts`. See ANIMATION-PLAYBOOK §1.

Wire video via `<video>` tag pointing to `/hero.mp4` (placeholder until real footage arrives — use a Cloudinary placeholder for now).

#### 2.2 — Program bento grid (Magic MCP)

Prompt Magic MCP:

> *"7-tile bento grid of martial arts disciplines. Dark theme, red accent on hover, image + title + one-line description per tile. Tiles link to /classes/[slug]. Use framer-motion `whileHover` on each tile: lift -4px and scale image inside mask to 1.08."*

Tiles: BJJ, Muay Thai, MMA, Women's BJJ, Kids, Open Mat, Strength & Conditioning.

#### 2.3 — Why-train-here feature cards

4-up row with icons and copy:
- **Build Unshakable Confidence**
- **Develop Discipline & Mental Focus**
- **Learn Practical Self-Defense**
- **Join Our Supportive Community**

(Copy adapted from existing site for continuity.) Wrap in `<RevealOnView>` for scroll-triggered fade-up.

#### 2.4 — Stat counters

Add `<AnimatedCounter />` instances to home page reinforcing quality signals: "30 weekly classes," "11 BJJ classes," "8 Muay Thai classes." See ANIMATION-PLAYBOOK §5.

### Day 4 — Class pages

#### 2.5 — Class page template

**Ask me for:** `components/sections/class-page-template.tsx` — composable shell consumed by all 7 class pages via props (title, intro, whatYoullLearn, whoFor, qualitySignals, faq, scheduleFilter, instructorSlug).

Hero uses `useScroll` + `useTransform` for parallax. See ANIMATION-PLAYBOOK §6.

#### 2.6 — Fill all 7 class pages

Use the content briefs in `docs/content-briefs/` to populate each class page. Each brief gives you: H1, meta, opening paragraph, H2 outline, FAQ array, internal links, schema.

#### 2.7 — Weekly schedule component

**Ask me for:** `components/schedule/weekly-schedule.tsx` — consumes `lib/schedule.ts`, renders 7-column grid on desktop + stacked on mobile, filter chips, discipline color coding, Event JSON-LD per class. Uses `LayoutGroup` + `AnimatePresence` for filter animations and shared `layoutId="active-discipline-underline"` for the active chip indicator. See ANIMATION-PLAYBOOK §8–9.

### Day 5 — Instructors, testimonials, polish

#### 2.8 — Instructor pages

Once instructor bios are provided, **ask me for:**
- `components/instructors/instructor-card.tsx` (with hover flip / mobile tap-to-reveal — see ANIMATION-PLAYBOOK §15)
- `app/instructors/page.tsx` (roster grid)
- `app/instructors/[slug]/page.tsx` (detail page with full Person schema + lineage section)

#### 2.9 — Testimonial marquee (21st.dev)

Prompt 21st.dev:

> *"Infinite horizontal marquee of testimonial cards. Dark theme, 5-star rating, quote, attributed name. Pauses on hover. Built on framer-motion."*

Use the 6 real reviews from existing site: Ricardo H., Jackie V., Kimmy P., Jae R., Edirin I., Jessica S.

#### 2.10 — About page

About page covers: gym story, facility, neighborhood, Mission Empower nonprofit. **Ask me for:** the page copy draft.

#### 2.11 — Contact page

Map embed (Google Maps iframe), hours derived from schedule, phone, email, lead form.

#### 2.12 — Page transitions

Create `app/template.tsx` with cross-fade. See ANIMATION-PLAYBOOK §12.

#### 2.13 — Footer

NAP block, sitemap links, social icons (Facebook, Instagram, Twitter/X, YouTube), mini lead form (first name + phone).

#### 2.14 — Mobile polish

- Hamburger nav (shadcn Sheet)
- Sticky "Book Free Trial" FAB with scroll-driven appearance — see ANIMATION-PLAYBOOK §13
- Touch target audit (min 44×44px)
- Reduced-motion verification (toggle OS setting and verify)

#### 2.15 — Commit Phase 2

```bash
git add .
git commit -m "feat: visual build — hero, program grid, schedule, class pages, instructors, testimonials, mobile"
git push
```

---

## Phase 3 — Lead Form (Day 6)

### 3.1 — Form component

**Ask me for:** `components/forms/lead-form.tsx` — RHF + Zod, three fields, `defaultInterest` and `source` props, loading/success/error states with framer-motion transitions. See ANIMATION-PLAYBOOK §10–11.

### 3.2 — Server action → n8n

**Ask me for:** `app/actions/submit-lead.ts` — typed server action that validates with Zod and POSTs to `N8N_WEBHOOK_URL`.

### 3.3 — Environment variables

Create `.env.local`:

```env
N8N_WEBHOOK_URL=https://webhook.site/YOUR-TEMPORARY-UUID
NEXT_PUBLIC_SITE_URL=https://missionmmachicago.com
NEXT_PUBLIC_META_PIXEL_ID=643275415764341
NEXT_PUBLIC_GA4_ID=
```

For the n8n placeholder, get a free testing endpoint at https://webhook.site — it gives you a unique URL and shows incoming requests in real time. Verify the form works there before n8n exists, then swap the URL.

Add the same vars (excluding `NEXT_PUBLIC_GA4_ID` for now) to Vercel: Project Settings → Environment Variables.

### 3.4 — Form placements

Embed `<LeadForm />` on:
- `/` (above footer)
- All 7 class pages (with `defaultInterest` set to discipline)
- `/contact`
- `/free-trial` (hero placement)
- Footer mini-form (variant with first name + phone only)

### 3.5 — Thank-you page

`/free-trial/thank-you` — short message: *"Got it — we'll text you within 24 hours to schedule your free class."* Fire GA4 conversion event on pageview.

### 3.6 — Test end-to-end

1. Submit from `/`, a class page, `/contact`, `/free-trial`
2. Check webhook.site for all four payloads
3. Confirm `source` field varies by page
4. Confirm `interest` field is set on class page submissions

### 3.7 — Commit Phase 3

```bash
git add .
git commit -m "feat: lead form + n8n webhook integration"
git push
```

---

## Phase 4 — Launch (Day 7)

### 4.1 — Lighthouse pass

Run Lighthouse on the Vercel preview URL for these pages, on mobile profile:
- `/`
- `/classes/brazilian-jiu-jitsu`
- `/schedule`
- `/contact`
- `/free-trial`

Targets:
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Fix any issue below target before proceeding. Common fixes: image dimensions, alt text, color contrast, missing labels.

### 4.2 — Schema validation

Paste each major page URL into https://search.google.com/test/rich-results:
- `/` — should detect LocalBusiness + AggregateRating
- `/classes/brazilian-jiu-jitsu` — should detect Course + FAQPage + BreadcrumbList
- `/schedule` — should detect Event entries
- `/instructors/[any-slug]` — should detect Person

Zero errors. Warnings okay if minor.

### 4.3 — AI crawler verification

1. Fetch `/robots.txt` and confirm explicit `Allow:` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended
2. Fetch `/llms.txt` and confirm content renders correctly
3. Submit `/sitemap.xml` to Bing Webmaster Tools (powers some LLM retrieval)

### 4.4 — Domain swap

1. Vercel: Project → Settings → Domains → Add `missionmmachicago.com` and `www.missionmmachicago.com`
2. Domain registrar: Update A/CNAME records per Vercel's instructions
3. Wait for SSL provisioning (~5 min)
4. Verify `https://missionmmachicago.com` loads the new site

### 4.5 — Google Search Console

1. Verify ownership via DNS TXT record or HTML file
2. Submit `https://missionmmachicago.com/sitemap.xml`
3. Request indexing of: home, all 7 class pages, schedule, instructors

### 4.6 — Verify production analytics

In production:
- Submit a test lead — confirm it appears in webhook.site / n8n
- Open browser devtools, confirm Meta Pixel fires PageView and Lead events
- Confirm GA4 fires page_view (if GA4 ID set)

### 4.7 — Tag the launch

```bash
git tag v1.0.0
git push --tags
```

### 4.8 — Post-launch (72-hour watch)

- Monitor GSC coverage report for crawl errors
- Spot-check 5 redirects from `docs/redirect-map.csv` — confirm they 301 correctly
- First AIO citation audit (see `docs/AIO-PLAYBOOK.md` §Monitoring)

🎉 **Launched.**
