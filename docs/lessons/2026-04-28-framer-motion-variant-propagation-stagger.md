# 2026-04-28 — Framer Motion variant propagation for nested zoom on parent hover

## What the problem was
Needed image zoom (scale 1.08) to trigger when the *card* is hovered, not just when the image div itself is hovered. Using `whileHover` directly on the inner `m.div` only fires when the cursor is over that div; content layers (gradient, text) above it intercept the pointer events.

## What the fix was
Used Framer Motion variant propagation:
1. Put `whileHover="cardHover"` on the parent `m.article`.
2. Gave the image wrapper `m.div` its own `variants` object with a `cardHover` key.
3. Framer Motion automatically propagates the `"cardHover"` variant name to all descendant motion elements that define that key.

Also used `custom={index}` on each card + a custom function in the "visible" variant to achieve per-card stagger delay without a container, since the cards live across two separate grid rows (stagger containers only propagate to direct motion children).

## Why it happened
`whileHover` on an inner element fires for hover on *that element*. Variant propagation fires for hover on *any ancestor* that declares the variant name. The correct tool depends on whether you want element-specific or ancestor-triggered hover.

## What to watch for in the future
- Variant propagation works only for motion elements (`m.div`, `m.article`, etc.) with a matching key in their `variants` object.
- Always define all states (`hidden`, `visible`, `cardHover`) in child variants — an undefined state leaves the value at its last animated position, which can cause unexpected hold behavior on mouse-leave.
- When stagger is needed across elements in multiple sub-containers, use `custom={index}` + a custom function variant rather than a single stagger container — the stagger container only staggers its *direct* children.
