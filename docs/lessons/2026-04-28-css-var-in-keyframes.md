# 2026-04-28 — CSS custom properties inside @keyframes for per-element animation values

## What the problem was
20 particles each need a different opacity peak, but share the same @keyframes block. Duplicating 20 keyframe declarations just to vary opacity would be unmaintainable.

## What the fix was
Set a CSS custom property (`--p-opacity`) as an inline style on each particle element, then reference it inside the shared @keyframes via `var(--p-opacity, 0.4)`:

```css
@keyframes particle-drift {
  15% { opacity: var(--p-opacity, 0.4); }
  85% { opacity: var(--p-opacity, 0.4); }
}
```

```tsx
style={{ '--p-opacity': 0.45 } as CSSProperties}
```

Because CSS custom properties are inherited and cascade normally, the `var()` in the keyframe resolves to the element's own `--p-opacity` at animation time. Each of the 20 particles peaks at its own opacity without a separate keyframe.

## Why it happened
CSS animations evaluate `var()` in keyframes against the element's own computed style at the time the animation runs. This is well-supported (Chrome 49+, Firefox 31+, Safari 9.1+).

## What to watch for in the future
- TypeScript's `React.CSSProperties` doesn't include arbitrary `--*` properties. Cast the style object `as CSSProperties` to suppress the error.
- The fallback value in `var(--p-opacity, 0.4)` matters — if the custom property is not set, the fallback keeps the animation meaningful.
- `animation-fill-mode: backwards` applies the 0% keyframe values during the delay period, so particles are invisible (opacity: 0) while waiting to start — no flash of visible content at the bottom of the container before each particle begins its drift.
- Never use `Math.random()` in a server component for computed styles — it produces different values on server vs. client, causing hydration mismatches. Use a static pre-computed array instead.
