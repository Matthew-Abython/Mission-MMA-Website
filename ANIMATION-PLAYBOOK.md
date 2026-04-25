# Animation Playbook (Framer Motion)

This is the operational reference for every animation on the Mission MMA site. Goal: consistent, premium-feeling motion that signals "serious facility" without harming Core Web Vitals or SEO.

**Library:** `framer-motion` only. Already installed.

**Import convention:**

```tsx
import { motion, AnimatePresence, useInView, useScroll, useTransform, LazyMotion, domAnimation, m } from "framer-motion";
```

---

## Performance guardrails (non-negotiable)

These rules apply to every animation. They protect SEO and AIO investments.

### 1. Use `LazyMotion` + `m` instead of `motion`

Cuts the framer-motion bundle from ~50KB gzipped to ~15KB. Wrap the app root once, then use `<m.div>` instead of `<motion.div>` everywhere downstream.

```tsx
// app/layout.tsx
import { LazyMotion, domAnimation } from "framer-motion";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}
```

The `strict` prop makes `<motion.*>` throw an error — forcing the entire codebase onto `<m.*>` and the lazy-loaded feature set.

### 2. Server components stay server components

Animations are client-side concerns. Mark only the *leaf* components that actually animate as `"use client"` — never the page or layout.

**Wrong:**
```tsx
"use client";
export default function ClassPage() {
  return (
    <motion.main>
      <h1>Brazilian Jiu-Jitsu Chicago</h1>  {/* SEO content now client-rendered */}
    </motion.main>
  );
}
```

**Right:**
```tsx
// page.tsx — server component
export default function ClassPage() {
  return (
    <main>
      <h1>Brazilian Jiu-Jitsu Chicago</h1>  {/* server-rendered HTML */}
      <ClassPageHero />  {/* client component, animation only */}
    </main>
  );
}
```

### 3. Respect `prefers-reduced-motion`

Use the built-in helper. Anyone with reduced motion enabled at the OS level gets instant transitions.

```tsx
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
const variants = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
  visible: { opacity: 1, y: 0 },
};
```

### 4. No animation on the LCP element

The Largest Contentful Paint element on every page (usually the hero image or H1) renders without animation. Animations on hero text are fine *after* LCP fires (delayed). Animating the LCP element itself tanks the metric.

### 5. Use `transform` and `opacity` only

These are the only properties the browser animates on the GPU. Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow` directly — use `scale`, `translate`, and opacity. Layout animations (`layout` prop) are an exception — framer-motion handles those efficiently via FLIP.

### 6. Mobile budget

On mobile devices, only the hero gets a full reveal sequence. Section reveals on scroll are simpler (opacity-only, no y-offset) or disabled if performance is tight. Lighthouse-check on a throttled mobile profile before launch.

---

## The Mission easing curve

Use `[0.16, 1, 0.3, 1]` (custom ease-out-quart) as the default site-wide easing. Confident and decisive — fast at the start, gentle at the end. Defined once in `lib/motion.ts`:

```ts
// lib/motion.ts
export const EASE_MISSION = [0.16, 1, 0.3, 1] as const;

export const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_MISSION } },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_MISSION } },
};

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const SCALE_HOVER = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.5, ease: EASE_MISSION } },
};
```

Import these everywhere instead of inlining values. Consistency is what separates polished from amateur.

---

## The animation inventory (15 animations)

### Home page

#### 1. Hero reveal sequence

**Where:** `components/sections/home-hero.tsx`
**What:** Logo, headline, subhead, CTA stagger in over ~700ms.
**Why:** First impression. Single biggest "this site feels expensive" moment.

```tsx
"use client";
import { m } from "framer-motion";
import { STAGGER_CONTAINER, FADE_UP } from "@/lib/motion";

<m.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
  <m.img src="/logo.svg" variants={FADE_UP} />
  <m.h1 variants={FADE_UP}>...</m.h1>
  <m.p variants={FADE_UP}>...</m.p>
  <m.a variants={FADE_UP}>Claim Your Free Class</m.a>
</m.div>
```

The H1 inside `<m.h1>` is still server-rendered HTML. Motion only animates the presentation.

#### 2. Background video subtle zoom

**Where:** Same hero file.
**What:** Looping video slowly scales 1.0 → 1.05 over 20 seconds.

```tsx
<m.video
  animate={{ scale: [1, 1.05] }}
  transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
  autoPlay muted loop playsInline
/>
```

#### 3. Program bento grid hover

**Where:** `components/sections/program-grid.tsx`
**What:** Tile lifts -4px on hover. Image inside scales to 1.08. Title shifts to red.

```tsx
<m.a whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: EASE_MISSION }} className="group">
  <m.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}>
    <Image ... />
  </m.div>
  <h3 className="group-hover:text-mission-red transition-colors">Brazilian Jiu-Jitsu</h3>
</m.a>
```

#### 4. Section reveal on scroll

**Where:** `components/motion/reveal-on-view.tsx`
**What:** Sections fade in and translate up 24px when entering viewport. Triggers once.

```tsx
"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE_MISSION } from "@/lib/motion";

export function RevealOnView({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_MISSION }}
    >
      {children}
    </m.div>
  );
}
```

Use sparingly — wrapping every section is overkill. Reserve for major transitions: program grid intro, why-train-here intro, testimonials intro, lead form intro.

#### 5. Stat counter on scroll

**Where:** `components/motion/animated-counter.tsx`
**What:** Numbers like "30 weekly classes" count up from 0 when scrolled into view.
**Why:** Reinforces the *quality / scale* signals from the SEO/AIO plan. Animated numbers are more memorable.

```tsx
"use client";
import { m, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_MISSION } from "@/lib/motion";

export function AnimatedCounter({ to, duration = 1.5 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) animate(count, to, { duration, ease: EASE_MISSION });
  }, [inView, to, count, duration]);

  return <m.span ref={ref}>{rounded}</m.span>;
}
```

### Class pages (used 7×)

#### 6. Class hero parallax

**Where:** `components/sections/class-page-hero.tsx`
**What:** Hero image translates upward at half the scroll rate of the foreground text.

```tsx
"use client";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ClassPageHero({ image, title, subtitle }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <m.div style={{ y }} className="absolute inset-0">
        <Image src={image} fill className="object-cover" priority />
      </m.div>
      <div className="relative z-10">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
```

#### 7. FAQ accordion

**Where:** shadcn Accordion (already framer-motion underneath via Radix). No additional work.

### Schedule page

#### 8. Discipline filter — layout animations

**Where:** `components/schedule/weekly-schedule.tsx`
**What:** Click filter chip → non-matching cards fade + scale down + disappear; matching cards regrid smoothly.

```tsx
"use client";
import { m, AnimatePresence, LayoutGroup } from "framer-motion";

<LayoutGroup>
  <AnimatePresence mode="popLayout">
    {filteredClasses.map((c) => (
      <m.div
        key={`${c.day}-${c.time}-${c.name}`}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: EASE_MISSION }}
      >
        <ClassCard class={c} />
      </m.div>
    ))}
  </AnimatePresence>
</LayoutGroup>
```

#### 9. Filter chip active state

**Where:** Same file.
**What:** Active filter chip has an underline that animates from previous chip to new one (shared layout).

```tsx
{disciplines.map((d) => (
  <button onClick={() => setActive(d)} className="relative">
    {label(d)}
    {active === d && (
      <m.span
        layoutId="active-discipline-underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-mission-red"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
  </button>
))}
```

### Lead form

#### 10. Field validation transitions

**Where:** `components/forms/lead-form.tsx`
**What:** Validation errors slide down from below the field. Cleared validation slides back up.

```tsx
<AnimatePresence>
  {errors.firstName && (
    <m.p
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="text-red-500 text-sm mt-1"
    >
      {errors.firstName.message}
    </m.p>
  )}
</AnimatePresence>
```

#### 11. Submit button → loading → success

**Where:** Same file.
**What:** Button text cross-fades to spinner during submit, then to checkmark.

```tsx
<button disabled={status !== "idle"}>
  <AnimatePresence mode="wait" initial={false}>
    {status === "idle" && (
      <m.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        Get Started
      </m.span>
    )}
    {status === "submitting" && (
      <m.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Spinner />
      </m.span>
    )}
    {status === "success" && (
      <m.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        ✓ Got it
      </m.span>
    )}
  </AnimatePresence>
</button>
```

### Site-wide

#### 12. Page transitions

**Where:** `app/template.tsx`
**What:** Soft 250ms cross-fade between routes.

```tsx
"use client";
import { m } from "framer-motion";

export default function Template({ children }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
```

Keep short — long page transitions feel sluggish.

#### 13. Sticky mobile CTA — appear on scroll

**Where:** `components/layout/sticky-cta.tsx`
**What:** "Book Free Trial" button slides up from below the viewport after the user scrolls past the hero.

```tsx
"use client";
import { m, useScroll, useTransform } from "framer-motion";

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 400, 500], [120, 120, 0]);
const opacity = useTransform(scrollY, [0, 400, 500], [0, 0, 1]);

<m.a
  href="/free-trial"
  style={{ y, opacity }}
  className="fixed bottom-6 right-6 md:hidden ..."
>
  Book Free Trial
</m.a>
```

#### 14. Testimonial marquee

**Where:** Comes from 21st.dev. They typically use framer-motion under the hood — no extra work.

#### 15. Instructor card flip / reveal

**Where:** `components/instructors/instructor-card.tsx`
**What:** Hover flips card on Y-axis to reveal credentials and lineage on the back.
**Why:** Visually showcases the *quality signal* content (lineage, belt rank, competition record) we identified as critical for AIO citations.

```tsx
<m.div
  whileHover={{ rotateY: 180 }}
  transition={{ duration: 0.6, ease: EASE_MISSION }}
  style={{ transformStyle: "preserve-3d" }}
>
  <div style={{ backfaceVisibility: "hidden" }}>{/* front: photo + name */}</div>
  <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
    {/* back: belt rank, lineage, years training, comp record */}
  </div>
</m.div>
```

On mobile, replace flip with tap-to-reveal expand/collapse.

---

## What we're explicitly NOT doing

- Heavy scroll-jacking or scroll-driven storytelling. Hurts SEO and AIO.
- Custom cursor effects. Tank Lighthouse, break on touch.
- Fullscreen page-load intros. Delay LCP, frustrate users.
- Letter-by-letter H1 typing. Done to death, costs accessibility.
- Animation on every section. Reserve motion for moments that earn it.

---

## Build phase integration

Per `docs/BUILD-GUIDE.md` Phase 2 (Visual Build):

- **Day 3:** Set up `LazyMotion`, create `lib/motion.ts`, build `<RevealOnView>` and `<AnimatedCounter />` primitives. Apply hero reveal, program grid hover.
- **Day 4:** Class hero parallax, schedule grid layout animations.
- **Day 5:** Instructor card flip, lead form transitions, page transitions, sticky CTA.

Each animation gets a Lighthouse spot-check before merging. If a component drops mobile Performance below 95, simplify or cut.
