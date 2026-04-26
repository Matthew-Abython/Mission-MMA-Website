/**
 * Shared framer-motion primitives for the Mission MMA site.
 * See docs/ANIMATION-PLAYBOOK.md for the full inventory of animations
 * and the rationale behind each curve and timing choice.
 */

import type { Variants, Transition } from "framer-motion";

/** Mission's signature easing curve — a custom ease-out-quart.
 *  Confident at the start, gentle at the end. */
export const EASE_MISSION = [0.16, 1, 0.3, 1] as const;

/** Standard durations, in seconds. */
export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.6,
  hero: 0.7,
} as const;

/** Reusable transition presets. */
export const TRANSITION_BASE: Transition = {
  duration: DURATION.base,
  ease: EASE_MISSION,
};

export const TRANSITION_HERO: Transition = {
  duration: DURATION.hero,
  ease: EASE_MISSION,
};

/** Fade in + slide up — the workhorse reveal. */
export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_MISSION },
  },
};

/** Pure opacity fade. */
export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_MISSION },
  },
};

/** Slide in from below (bigger than FADE_UP — for hero CTAs). */
export const SLIDE_UP: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.hero, ease: EASE_MISSION },
  },
};

/** Stagger container — pair with FADE_UP children for sequential reveals. */
export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Faster stagger — for bento grids and lists. */
export const STAGGER_FAST: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Hover scale — used on cards, image masks. */
export const SCALE_HOVER: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: DURATION.base, ease: EASE_MISSION },
  },
};
