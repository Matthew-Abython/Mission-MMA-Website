"use client";

import { useEffect, useRef } from "react";
import {
  m,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { EASE_MISSION } from "@/lib/motion";

export function AnimatedCounter({
  to,
  duration = 1.5,
  noFormat = false,
}: {
  to: number;
  duration?: number;
  noFormat?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const reduced = useReducedMotion();

  const count = useMotionValue(reduced ? to : 0);
  const rounded = useTransform(count, (v) =>
    noFormat ? String(Math.round(v)) : Math.round(v).toLocaleString()
  );

  useEffect(() => {
    if (reduced) return;
    if (!isInView) return;
    const controls = animate(count, to, {
      duration,
      ease: EASE_MISSION,
    });
    return () => controls.stop();
  }, [isInView, to, duration, count, reduced]);

  return <m.span ref={ref}>{rounded}</m.span>;
}
