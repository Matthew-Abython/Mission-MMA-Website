"use client";

import { m, useReducedMotion } from "framer-motion";

/**
 * Per-navigation entry animation. Soft 250ms opacity fade-in.
 *
 * Re-mounts on every route change because of Next.js App Router's
 * template.tsx semantics. Layout state (header, footer) lives in layout.tsx
 * and is unaffected.
 *
 * Reduced motion: render children immediately with no animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

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
