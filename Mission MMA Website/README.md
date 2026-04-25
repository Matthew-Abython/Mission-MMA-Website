# Mission MMA & Fitness

The official website for [Mission MMA & Fitness](https://missionmmachicago.com/) — Chicago's premier Brazilian Jiu-Jitsu, Muay Thai, MMA, and martial arts gym in the West Loop.

**1620 W Carroll Ave, Chicago, IL 60612** · [312-265-1856](tel:312-265-1856) · [info@missionmmachicago.com](mailto:info@missionmmachicago.com)

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion**
- **React Hook Form + Zod** for the lead form
- **21st.dev** + **Magic MCP** for visual components (via Antigravity)
- **Vercel** hosting

No CMS, no CRM, no database. The site is a static marketing surface with one outbound webhook for lead capture.

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # fill in secrets
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Purpose |
|---|---|
| `N8N_WEBHOOK_URL` | Where lead form submissions are POSTed |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, OG tags) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Facebook Pixel (inherited: `643275415764341`) |

## Structure

```
/app                  Next.js App Router pages
  /actions            Server actions (lead submission)
  /classes            Discipline pages
  /api                (none currently — server actions instead)
/components
  /ui                 shadcn primitives
  /sections           Page section components
  /schedule           Weekly schedule + filter
  /forms              Lead form variants
  /instructors        Instructor cards + flip
  /motion             Reusable framer-motion primitives
  /magic              21st.dev / Magic MCP imports
/lib
  schema.ts           JSON-LD builders
  schedule.ts         Weekly class schedule (typed, hardcoded)
  motion.ts           Shared variants + EASE_MISSION curve
  seo.ts              Metadata helpers
/public
  llms.txt            LLM-crawler summary
  robots.txt          AI crawler allowlist
/docs
  PLAN.md             Master plan
  BUILD-GUIDE.md      Step-by-step build walkthrough
  AIO-PLAYBOOK.md     LLM/AIO optimization playbook
  ANIMATION-PLAYBOOK.md  Every framer-motion animation
  schedule-data.md    Schedule data ready to paste
  redirect-map.csv    301 redirect map from old site
  content-briefs/     Per-class SEO content briefs
```

## Updating the schedule

Edit `lib/schedule.ts`, commit, push. Vercel deploys automatically.

## Deployment

Auto-deploys to Vercel on push to `main`. PRs get preview URLs. Production: `missionmmachicago.com`.

## Planning docs

| Doc | Purpose |
|---|---|
| [PLAN.md](./PLAN.md) | Master plan, architecture, SEO/AIO strategy, success metrics |
| [docs/BUILD-GUIDE.md](./docs/BUILD-GUIDE.md) | Step-by-step execution walkthrough — start here when building |
| [docs/AIO-PLAYBOOK.md](./docs/AIO-PLAYBOOK.md) | How to get cited by LLMs |
| [docs/ANIMATION-PLAYBOOK.md](./docs/ANIMATION-PLAYBOOK.md) | Every framer-motion animation with code patterns |
| [docs/schedule-data.md](./docs/schedule-data.md) | Schedule typed and ready to drop in |
| [docs/redirect-map.csv](./docs/redirect-map.csv) | 301 redirects from old site URLs |
| [docs/content-briefs/](./docs/content-briefs/) | SEO content briefs per class page |
