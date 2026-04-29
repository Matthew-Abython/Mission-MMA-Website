"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  /**
   * Parallax intensity. 0 = no offset, 1 = full ±80px range.
   * Positive values make children move slower than scroll (rise on entry).
   * Default: 0.3 → ±24px travel.
   */
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  // Track how far the section has scrolled through the viewport [0 = entering bottom, 1 = exiting top]
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = speed * 80;
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);

  return (
    <div ref={ref} className={className}>
      {/* Pass static 0 when reduced — m.div accepts both number and MotionValue<number> */}
      <m.div style={{ y: reduced ? 0 : y }}>{children}</m.div>
    </div>
  );
}
