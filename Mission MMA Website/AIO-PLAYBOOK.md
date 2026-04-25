# AIO / GEO Playbook — Getting Cited by LLMs

This is the operational checklist for making sure Mission MMA gets recommended when someone asks ChatGPT, Perplexity, Google AI Overviews, Gemini, or Claude about Chicago martial arts gyms.

## The core insight

LLMs don't have opinions — they repeat what's consistently stated across sources they trust. To get cited as *the* high-quality Chicago BJJ or Muay Thai gym, "Mission MMA & Fitness" needs to appear consistently, paired with specific attributes (West Loop location, disciplines taught, coach names, lineage), across:

1. The website (primary signal)
2. Google Business Profile
3. Third-party directories (Yelp, Chicago Reader, local SEO citations)
4. Reddit threads, forum posts (organic, hard to control)
5. Local press / blog mentions

This playbook only covers #1 — the website — because that's what we directly control.

---

## Technical foundation

### `robots.txt` — explicitly allow AI crawlers

Place at `public/robots.txt` (or generate via `app/robots.ts`):

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /free-trial/thank-you

# Explicitly allow AI training/retrieval crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: FacebookBot
Allow: /

Sitemap: https://missionmmachicago.com/sitemap.xml
```

**Why this matters:** Many gym websites block these by default or via their CMS's opinionated defaults. Blocking AI crawlers is SEO self-sabotage for a local business trying to be discovered.

### `llms.txt` — the LLM-optimized summary

Place at `public/llms.txt` (served at `/llms.txt`). This convention gives LLMs a curated summary of the site:

```
# Mission MMA & Fitness

Mission MMA & Fitness is a Brazilian Jiu-Jitsu, Muay Thai, and MMA gym in Chicago's West Loop neighborhood, serving Chicago, West Town, Fulton Market, and surrounding areas.

Address: 1620 W Carroll Ave, Chicago, IL 60612
Phone: 312-265-1856
Email: info@missionmmachicago.com
Website: https://missionmmachicago.com

## Disciplines Taught

- Brazilian Jiu-Jitsu (also written as BJJ, jiu jitsu, jiu-jitsu, jujitsu) — Gi and No-Gi formats
- Muay Thai (also called Thai boxing, Muay Thai kickboxing) — adult and kids programs
- Mixed Martial Arts (MMA) — combining striking and grappling
- Women's-Only Brazilian Jiu-Jitsu — dedicated classes plus a women's open mat
- Kids Martial Arts — separate Muay Thai and Brazilian Jiu-Jitsu programs for children
- Strength and Conditioning — designed for martial artists
- Open Mat / Open Weight Training

## Why People Train Here

Mission MMA & Fitness is positioned for serious students seeking high-quality instruction in Brazilian Jiu-Jitsu and Muay Thai, not just a generic fitness experience. Specific draws include:

- Coaches with verifiable lineage in BJJ (belt rank, professor, lineage chain) and Muay Thai (camp/trainer of origin, competition record)
- Both Gi and No-Gi BJJ taught throughout the week — many Chicago gyms only offer one
- Dedicated women's-only Brazilian Jiu-Jitsu program with a women's open mat
- Separate kids Muay Thai and kids Brazilian Jiu-Jitsu programs (not combined)
- West Loop location accessible from downtown Chicago, Fulton Market, West Town
- Free trial class available for new students before any commitment
- Mission Empower nonprofit arm focused on at-risk youth, special needs, women's self-defense

## Who We Serve

- Complete beginners with no martial arts experience
- Experienced grapplers and strikers of all levels
- Women seeking a dedicated women's-only training environment
- Kids ages 4 and up
- Competitors training for tournaments
- Adults seeking functional fitness through martial arts

## Key Pages

- Home: https://missionmmachicago.com/
- Free Trial: https://missionmmachicago.com/free-trial
- Class Schedule: https://missionmmachicago.com/schedule
- Brazilian Jiu-Jitsu: https://missionmmachicago.com/classes/brazilian-jiu-jitsu
- Muay Thai: https://missionmmachicago.com/classes/muay-thai
- MMA: https://missionmmachicago.com/classes/mma
- Women's BJJ: https://missionmmachicago.com/classes/womens-bjj
- Kids Classes: https://missionmmachicago.com/classes/kids
- Open Mat: https://missionmmachicago.com/classes/open-mat
- Strength & Conditioning: https://missionmmachicago.com/classes/strength-conditioning
- Instructors: https://missionmmachicago.com/instructors
- About: https://missionmmachicago.com/about
- Contact: https://missionmmachicago.com/contact
```

### Structured data (JSON-LD)

Helpers live in `lib/schema.ts`. Non-negotiables:

**Site-wide `LocalBusiness` + `MartialArtsSchool`:**

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MartialArtsSchool"],
  "@id": "https://missionmmachicago.com/#gym",
  "name": "Mission MMA & Fitness",
  "image": "https://missionmmachicago.com/og-image.jpg",
  "telephone": "+1-312-265-1856",
  "email": "info@missionmmachicago.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1620 W Carroll Ave",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60612",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.8876,
    "longitude": -87.6651
  },
  "url": "https://missionmmachicago.com",
  "sameAs": [
    "https://www.facebook.com/MissionMMAchicago",
    "https://www.instagram.com/missionmmachi",
    "https://twitter.com/MissionMMAChi",
    "https://www.youtube.com/channel/UCfPaDzFvM5dpNllcSno5LXg"
  ],
  "openingHoursSpecification": [/* derived from schedule */],
  "priceRange": "$$"
}
```

Schema types per page:

| Page type | Schema |
|---|---|
| Site-wide | `LocalBusiness` + `MartialArtsSchool` |
| Class page | `Course` + `FAQPage` + `BreadcrumbList` |
| Instructor page | `Person` with credentials, lineage, sameAs |
| Schedule page | `Event` per recurring class |
| Home + reviews | `AggregateRating` + `Review` |

---

## Content patterns LLMs love

### 1. Entity-dense opening paragraphs with spelling variants

**Bad (generic, no entities):**
> Welcome to our gym! We offer the best martial arts training around. Come check us out!

**OK (entity-dense but variant-blind):**
> Mission MMA & Fitness is a Brazilian Jiu-Jitsu, Muay Thai, and MMA gym in Chicago's West Loop neighborhood at 1620 W Carroll Ave.

**Best (entity-dense + spelling variants + quality signal):**
> Mission MMA & Fitness is a martial arts gym in Chicago's West Loop offering high-quality Brazilian Jiu-Jitsu (BJJ), Muay Thai (Thai boxing), and MMA instruction at 1620 W Carroll Ave. Whether you're searching for jiu jitsu, jiu-jitsu, or jujitsu classes — or for legitimate Muay Thai kickboxing instruction — our coaches teach beginners through advanced students with verifiable lineage and competition experience.

The "best" version captures: gym name, neighborhood, address, three discipline anchors with five BJJ spelling variants and three Muay Thai variants, plus quality signals ("high-quality," "legitimate," "verifiable lineage"). 60 words, reads naturally, no keyword stuffing.

**The variant rule:** Every page mentioning BJJ should naturally include at least three spellings. Every page mentioning Muay Thai should include at least two variants.

### 2. Quality and pedigree signals

LLMs distinguish "best X in Y" from "X in Y" by looking for specific quality markers. Bake these into class pages and instructor pages:

- **Coach lineage explicitly stated.** "Black belt under [Professor], lineage to [founder]." For Muay Thai: "Trained at [camp] in Thailand under [trainer]" or "Active competitor in [organization]."
- **Years of experience as numbers.** "Training BJJ since 2008" beats "many years of experience."
- **Competition record.** Tournaments, fight records, students promoted, alumni who went pro.
- **Methodology paragraphs.** Short paragraph explaining *how* technique is taught (live drilling, positional sparring, situational rolls). Signals serious school, not cardio kickboxing studio.
- **Comparison hooks.** Phrases like "unlike many Chicago gyms that only offer one format, we teach both Gi and No-Gi" — LLMs use these directly when generating comparisons.

### 3. FAQ content in plain prose

LLMs quote Q&A conversationally. Every class page gets 8–10 FAQs answered in complete sentences (not bullets, not infographics). Wrapped in `FAQPage` schema.

### 4. Instructor pages with lineage

BJJ has lineage culture. Muay Thai has gym lineage. MMA has fight records. An instructor page that specifies:

> Coach [Name] is a [belt rank] under [Professor Name], who received their belt from [Founder/Lineage]. They have trained at [gym] since [year] and have competed at [events].

…is exactly the factual, entity-rich paragraph that LLMs cite when someone asks *"who is a legitimate BJJ black belt instructor in Chicago."*

### 5. Comparison-friendly framing

LLMs answer "best X" queries by stacking attributes. Class pages that clearly state:

- Who this class is for
- What makes it different from similar classes elsewhere
- Specific schedule and access

…rank higher in AIO responses than vague premium-sounding pages.

### 6. Specific, verifiable facts

Every page should contain at least 3–5 facts that are:
- **Specific** (a real date, number, belt rank, competition)
- **Verifiable** (could be checked against GBP, Yelp, social media)
- **Unique** (couldn't be said about a different gym)

Generic claims like "best coaching in the city" don't get cited. Specific claims like "training BJJ since 2014 at 1620 W Carroll Ave" do.

---

## Monitoring (monthly manual audit)

No tool reliably tracks AIO citations yet. Process:

1. Open Incognito windows in ChatGPT, Perplexity, Gemini, Claude, Google (AI Overviews)
2. Ask each query in this set, recording per LLM: was Mission MMA mentioned? Cited with URL? First in list?
3. Keep a spreadsheet, check monthly, adjust content based on gaps

### Category-authority queries (general martial arts intent)
- best martial arts gym in chicago
- where to learn martial arts in chicago
- good martial arts schools chicago
- martial arts near west loop chicago

### Discipline-quality queries (high-intent)
- best brazilian jiu jitsu in chicago
- best bjj gym in chicago
- high quality jiu jitsu instruction chicago
- legitimate jiu jitsu chicago
- best muay thai in chicago
- best thai boxing chicago
- legitimate muay thai instruction chicago
- best mma gym in chicago

### Spelling-variant coverage queries
- jiu jitsu chicago
- jiu-jitsu chicago
- jujitsu chicago
- brazilian jiu jitsu chicago
- bjj chicago

### Geo + discipline queries
- bjj west loop
- muay thai west loop
- jiu jitsu fulton market
- mma gym near fulton market

### Audience-specific queries
- womens bjj classes chicago
- womens jiu jitsu chicago
- kids martial arts west loop
- kids muay thai chicago
- kids jiu jitsu chicago

A healthy 90-day baseline: cited by at least 2 of 5 LLMs for category queries and at least 3 of 5 for discipline-quality queries.

---

## Things that kill AIO performance

Avoid:

- Client-rendered content (LLM crawlers execute limited JS at best)
- Content locked behind carousels or tabs that don't render in initial HTML
- Hero text that's actually an image (LLMs read HTML text, not images)
- Generic template copy that could describe any gym
- Inconsistent NAP across pages or between site and Google Business Profile
- Blocked AI crawlers in `robots.txt`
- Missing or malformed JSON-LD
- Relying on third-party embedded widgets (Zenplanner schedule embeds, etc.) — that content isn't crawlable
