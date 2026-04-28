"use client";

import Link from "next/link";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function StickyMobileCta() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  const y = useTransform(scrollY, [0, 400, 500], [120, 120, 0]);
  const opacity = useTransform(scrollY, [0, 400, 500], [0, 0, 1]);

  if (reduced) {
    return (
      <Link
        href="/book"
        className="fixed bottom-4 left-4 right-4 z-30 rounded-md bg-mission-red px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-mission-white shadow-[0_8px_32px_rgba(200,16,46,0.4)] md:hidden"
      >
        Book Free Trial
      </Link>
    );
  }

  return (
    <m.div
      style={{ y, opacity }}
      className="fixed bottom-4 left-4 right-4 z-30 md:hidden"
    >
      <Link
        href="/book"
        className="block rounded-md bg-mission-red px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-mission-white shadow-[0_8px_32px_rgba(200,16,46,0.4)] hover:bg-mission-red-dark"
      >
        Book Free Trial
      </Link>
    </m.div>
  );
}
