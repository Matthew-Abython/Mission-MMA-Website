# Lesson: shadcn Nova preset does not ship a `form` component

## What the problem was
Running `pnpm dlx shadcn@latest add form` with the `base-nova` preset silently exits with code 0 but creates no file. The `form` component is absent from the Nova preset registry.

## What the fix was
Manually created `components/ui/form.tsx` — a react-hook-form wrapper using `FormProvider`, `Controller`, and React context for field state. Initially used `React.cloneElement` to inject `id`, `aria-describedby`, and `aria-invalid` onto the child input; this was subsequently replaced with `@radix-ui/react-slot` (installed separately via `pnpm add @radix-ui/react-slot`) because `cloneElement` silently overwrites child props while `Slot` merges them.

## Why it happened
The new shadcn/ui CLI (v2+) ships multiple design presets (Nova, Vega, Maia, etc.) built on `@base-ui/react` instead of `@radix-ui/react-*`. The Nova preset only includes components it explicitly supports; `form` was not ported to the new registry at the time of this project setup.

## What to watch for in the future
- Any `pnpm dlx shadcn@latest add <component>` that exits 0 but produces no output likely means the component is missing from the active preset's registry — verify with `ls components/ui/` afterwards.
- `@radix-ui/react-slot` is not installed by default in Base UI projects but installs cleanly alongside it — prefer it over `React.cloneElement` for any Slot-pattern wrapper (cloneElement silently overwrites child props; Slot merges them).
- The `components.json` `style` field will be `base-nova` (not `default` or `new-york`) for Tailwind 4 + Nova preset projects.
