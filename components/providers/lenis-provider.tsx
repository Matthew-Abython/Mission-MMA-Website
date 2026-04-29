"use client";

import { useMemo } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { LenisOptions } from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Wraps the site in Lenis smooth scroll (root mode — no wrapper div rendered).
 *
 * prefers-reduced-motion: lerp is set to 1 (instant/native) so the RAF loop
 * still runs but applies zero smoothing delay. This avoids a hydration mismatch
 * that would occur if we conditionally rendered ReactLenis vs plain children.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const reduced = useReducedMotion() ?? false;

  const options = useMemo<LenisOptions>(
    () => ({
      // lerp:1 = instant scroll (no smoothing) for reduced-motion users
      lerp: reduced ? 1 : 0.1,
    }),
    [reduced],
  );

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
