# 2026-04-29 — Chat Widget: Client-side fetch, AbortController timeout, in-memory history

## What the problem was
Needed a floating chat widget that calls an n8n chatbot webhook directly from the browser with a hard timeout, while keeping conversation history bounded in memory. Standard server actions can't support custom timeouts or AbortController, and localStorage would persist stale sessions across page reloads.

## What the fix was

Built `components/chat/chat-widget.tsx` as a `"use client"` component using direct `fetch()` with `AbortController`.

### Decision 1: Direct fetch vs. server action
Used browser-side `fetch()` + `AbortController` + `setTimeout(15_000)` instead of a Next.js server action. Server actions don't expose a way to pass an `AbortSignal`, so a 15-second client-enforced timeout isn't possible from a server action. The webhook URL uses `NEXT_PUBLIC_` (visible in client bundle) — acceptable for a chatbot endpoint that authenticates/rate-limits at the n8n layer.

### Decision 2: Message history trimming
History is capped at `MAX_PAIRS * 2 = 8` messages (4 conversation pairs). `trimToMaxPairs()` helper slices to the last 8 entries and is called after both the user message and the bot reply are appended. This avoids ever sending unbounded history while preserving recent context.

### Decision 3: sessionId via useRef
`useRef<string>(\`session_${Date.now()}\`)` generates the ID once at mount. `useRef` is semantically correct for a value that doesn't drive re-renders. `Date.now()` inside a `"use client"` component runs only on the client, so no SSR hydration mismatch.

### Decision 4: @keyframes typing-dot in globals.css
The 3-dot bounce animation is a CSS `@keyframes` defined in `globals.css` (not in the component file). Project rule confirmed by lesson `2026-04-28-hero-mesh-gradient-css-keyframes.md`. The three spans stagger via `animationDelay` inline styles (0s, 0.15s, 0.3s).

### Decision 5: cta-pulse removal not paused
When the panel is open, the button's pulse is removed by setting `style` to `undefined`, not by toggling `animationPlayState: "paused"`. This is because `animationPlayState` only affects CSS animations reliably when not mixed with Framer Motion WAAPI — setting to `undefined` cleanly removes the animation. Confirmed by lesson `2026-04-28-marquee-hover-pause-css-vs-waapi.md`.

### Decision 6: Widget placement in layout
`<ChatWidget />` is placed inside `<LazyMotion>` (required for `m.*` and `AnimatePresence`) but outside `<LenisProvider>`. `LenisProvider` uses `ReactLenis root` which renders no DOM wrapper, so placement relative to it is semantically clean. The widget's internal `overflow-y-auto` messages container scrolls independently of Lenis root scroll.

### Decision 7: PANEL_VARIANTS as const
The variant object uses `as const` to prevent TypeScript strict mode from widening the `ease` array type. Required for all standalone Framer Motion variant objects in this codebase. Confirmed by lesson `2026-04-28-framer-motion-variant-type-as-const.md`.

## Why it happened
This is the first component in the project to make a client-side API call (all other forms use server actions). The constraints are different: timeout control, in-memory state, and a `NEXT_PUBLIC_` env var — all normal for a chat widget but new patterns for this codebase.

## What to watch for in the future
- If the webhook response shape changes from `response[0].botResponse`, update the parse at the optional chain `data?.[0]?.botResponse` in `handleSend`.
- If the message cap needs adjustment, change `MAX_PAIRS` at the top of the component file.
- `NEXT_PUBLIC_CHATBOT_WEBHOOK_URL` is in the client JS bundle by design. It differs from `N8N_WEBHOOK_URL` (server-only, no prefix).
- The widget is `z-50`; `StickyMobileCta` is `z-30`; `SiteHeader` is `z-40`. Widget renders on top of the sticky CTA on mobile — position `bottom-20 right-4` clears the CTA button vertically.
- `scrollIntoView` inside the `overflow-y-auto` messages div scrolls the container, not the window — Lenis does not intercept it.
