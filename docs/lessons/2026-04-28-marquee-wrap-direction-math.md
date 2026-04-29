# 2026-04-28 — Seamless marquee wrap math for bidirectional scroll

## What the problem was
A horizontal infinite marquee with 4 identical text copies needs to loop seamlessly. The wrap range is 25% (one copy = 1/4 of the row). For leftward scrolling the wrap is trivial, but rightward scrolling using a naive positive-x transform reveals empty space to the left of the first copy.

## What the fix was
Both directions map their MotionValue into the same [-25%, 0%] window:

- **Left** (`baseDir = -1`): `baseX` accumulates negatively. Transform: `v % 25` → values in `(-25%, 0%]`. Starts at 0%, wraps when it reaches -25%.
- **Right** (`baseDir = +1`): `baseX` accumulates positively. Transform: `(v % 25) - 25` → values in `[-25%, 0%)`. Starts at -25% (showing copy 2), scrolls rightward toward 0%, wraps back to -25% at `v % 25 == 0`. Seamless because both edges (-25% and 0%) show the start of an identical copy.

The `xOffset` constant (`-25` for right, `0` for left) is captured once at component creation and added to the per-frame `v % 25`.

## Why it happened
Rightward scrolling requires content to the LEFT of the initial viewport position. With copies arranged left-to-right, a positive x transform (row moves right) immediately exposes empty space on the left. The fix is to start the row at -25% (one copy shifted left) so there is always content left of the viewport as x increases toward 0%.

## What to watch for in the future
- `v % 25` in JavaScript preserves the sign of the dividend, so it gives negative values for negative `v` — which is what left-scrolling needs.
- The `xOffset` must be applied INSIDE the `useTransform` callback (to the per-frame `v % 25` result), not as a CSS offset on the outer container.
- If copy count changes from 4, the wrap size changes: `100% / numCopies`. Update `xOffset` (`-(100% / numCopies)` for right, `0` for left) and the modulo divisor accordingly.
- `{ clamp: false }` on `velocityFactor` allows extrapolation beyond the mapped range — intentional for dramatic scroll-momentum boost at high speeds.
