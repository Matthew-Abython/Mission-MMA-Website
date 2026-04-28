# framer-motion 12 — Variants require `as const` on `type` strings

## What the problem was
TypeScript threw errors on every variant object that contained a `transition: { type: "spring", ... }` block. The error read: `Type 'string' is not assignable to type 'AnimationGeneratorType | undefined'`.

## What the fix was
Add `as const` to the `type` literal:
```ts
transition: { type: "spring" as const, stiffness: 400, damping: 28 }
```
Alternatively, mark the entire variant object `as const` if the whole shape is static.

## Why it happened
framer-motion 12 tightened the `Transition` type so that `type` must be the literal union `AnimationGeneratorType` (e.g. `"spring" | "tween" | "inertia"`), not a plain `string`. TypeScript infers string literals as `string` unless widening is suppressed.

## What to watch for in the future
Any time a variant or transition is defined in a component variable (not inline), check that `type` values carry `as const`. Inline JSX props don't need it because TypeScript narrows them from the prop signature, but standalone objects do.
