"use client";

import { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

interface ParallaxTextProps {
  text: string;
  /** Base marquee speed in "percent of row width per second". Default: 5 */
  speed?: number;
  direction?: "left" | "right";
  color?: string;
  /** Opacity of the entire element. Default: 0.06 (background texture) */
  opacity?: number;
}

/**
 * Horizontal marquee of 4 repeated copies of `text`.
 * Base direction is constant; scroll velocity adds momentum (spring-smoothed).
 *
 * Wrap math: the row is 4× one copy wide. x moves within a ±25% window
 * (= one copy width as a fraction of the row). Both directions use the
 * [-25%, 0%] range; the xOffset shifts rightward starts to -25% so the
 * wrap at 0% → -25% stays seamless (identical content at both edges).
 *
 * Left:  baseX → negative, x = v % 25        in (-25%, 0%]
 * Right: baseX → positive, x = (v % 25) − 25  in [-25%, 0%)
 */
export function ParallaxText({
  text,
  speed = 5,
  direction = "left",
  color = "white",
  opacity = 0.06,
}: ParallaxTextProps) {
  const reduced = useReducedMotion() ?? false;
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Spring-smooth the raw velocity so sudden stops feel physical
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Map scroll speed (px/s) to a dimensionless boost multiplier
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 2000],
    [-3, 3],
    { clamp: false },
  );

  // -1 = leftward, +1 = rightward
  const baseDir = direction === "left" ? -1 : 1;
  // Offset so rightward starts at -25% (seamless wrap from 0% → -25%)
  const xOffset = direction === "right" ? -25 : 0;

  useAnimationFrame((_t, delta) => {
    if (reduced) return;
    // Boost proportional to absolute scroll velocity — never changes base direction
    const boost = Math.abs(velocityFactor.get()) * 2;
    const moveBy = baseDir * (speed + boost) * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap baseX into a repeating 25% window (one copy width)
  const x = useTransform(baseX, (v) => `${(v % 25) + xOffset}%`);

  return (
    <div
      className="overflow-hidden whitespace-nowrap select-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <m.div
        className="flex"
        style={{ x: reduced ? `${xOffset}%` : x }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="font-display uppercase"
            style={{
              fontSize: "clamp(80px, 10vw, 140px)",
              color,
              paddingRight: "0.5em",
              flexShrink: 0,
            }}
          >
            {text}
          </span>
        ))}
      </m.div>
    </div>
  );
}
