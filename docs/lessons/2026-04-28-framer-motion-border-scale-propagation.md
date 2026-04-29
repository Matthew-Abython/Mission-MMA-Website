# 2026-04-28 — Framer Motion border scaleX via variant propagation (not layoutId)

## What the problem was
The spec described a "layoutId trick" for the bottom border animation (scaleX 0 → 1 on card enter). `layoutId` is actually for shared-element layout transitions between two different DOM nodes — not for in-place scale animations. Using it here would have been wrong.

## What the fix was
Used Framer Motion variant propagation:
1. Parent `m.div` (card) has `variants={CARD_VARIANTS}` with `hidden` and `visible` states.
2. Child `m.div` (border) has `variants={BORDER_VARIANTS}` with `hidden: { scaleX: 0 }` and `visible: { scaleX: 1, transition: { delay: 0.4 } }`.
3. The grandparent grid has `variants={STAGGER_FAST}`, which staggers the "visible" trigger per card.
4. When a card receives "visible", the border inside also receives "visible" at the same moment — but its own `delay: 0.4` makes it start 0.4s later, creating a "number appears → border grows" sequence.
5. `className="origin-center"` (Tailwind) sets `transform-origin: center` so the border expands from the middle outward.

## Why it happened
The spec author used "layoutId trick" loosely to mean "Framer Motion animation trick." The actual Framer Motion concept at work is variant state propagation from stagger container → card → border.

## What to watch for in the future
- `layoutId` = shared element transition between two locations in the DOM (e.g., selected tab indicator). Do not use it for in-place scale/fade animations.
- `scaleX` animation on an absolutely-positioned full-width border requires `origin-center` — without it, the border grows from the left edge.
- The `delay` in child variant's `visible` transition is relative to when the child *received* the "visible" trigger, not when the grandparent animation started. Combined with a stagger container, this creates double-stagger: cards stagger apart, borders trail each card independently.
