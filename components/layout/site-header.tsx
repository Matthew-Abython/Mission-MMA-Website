"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import {
  m,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { FADE_UP, EASE_MISSION } from "@/lib/motion";

const PRIMARY_NAV = [
  { href: "/classes",     label: "Classes" },
  { href: "/schedule",    label: "Schedule" },
  { href: "/instructors", label: "Coaches" },
  { href: "/about",       label: "About" },
  { href: "/contact",     label: "Contact" },
  { href: "/faq",         label: "FAQ" },
];

const PROGRAM_LINKS = [
  { href: "/classes/brazilian-jiu-jitsu",   label: "Brazilian Jiu-Jitsu" },
  { href: "/classes/muay-thai",              label: "Muay Thai" },
  { href: "/classes/mma",                    label: "MMA" },
  { href: "/classes/womens-bjj",             label: "Women's BJJ" },
  { href: "/classes/kids",                   label: "Kids Martial Arts" },
  { href: "/classes/open-mat",               label: "Open Mat" },
  { href: "/classes/strength-conditioning",  label: "Strength & Conditioning" },
];

// 50ms stagger for mobile nav links
const MOBILE_NAV_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

// ── Animated hamburger → X icon ───────────────────────────────────────────────
function HamburgerIcon({ isOpen, reduced }: { isOpen: boolean; reduced: boolean }) {
  // Reduced motion: instant icon swap, no animation
  if (reduced) {
    return isOpen
      ? <X className="h-6 w-6" aria-hidden="true" />
      : <Menu className="h-6 w-6" aria-hidden="true" />;
  }

  /**
   * Three SVG paths animate:
   *   Top bar:    rotate +45°, y +6px → top-left to bottom-right diagonal
   *   Middle bar: opacity+scaleX → 0 (disappears)
   *   Bottom bar: rotate -45°, y -6px → bottom-left to top-right diagonal
   *
   * transform-box:fill-box makes transform-origin:"center" resolve to each
   * path's own bounding box center (required for correct SVG rotation pivot).
   */
  const pathStyle: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "center",
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <m.path
        d="M 3 6 L 21 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={pathStyle}
        initial={{ rotate: 0, y: 0 }}
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_MISSION }}
      />
      <m.path
        d="M 3 12 L 21 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={pathStyle}
        initial={{ opacity: 1, scaleX: 1 }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <m.path
        d="M 3 18 L 21 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={pathStyle}
        initial={{ rotate: 0, y: 0 }}
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_MISSION }}
      />
    </svg>
  );
}

// ── Main header ───────────────────────────────────────────────────────────────
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <header className="sticky top-0 z-40">
      {/* Always-on subtle base for legibility at scroll=0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"
      />

      {/* Scrolled backdrop — mounted only when scrolled; AnimatePresence unmounts on exit */}
      <AnimatePresence>
        {isScrolled && (
          <m.div
            key="header-bg"
            aria-hidden="true"
            className="absolute inset-0 border-b border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              backgroundColor: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">

        {/* ── Logo — shrinks slightly at scroll > 80px ──────────────────── */}
        <m.div
          animate={{ scale: !reduced && isScrolled ? 0.85 : 1 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
          style={{ originX: 0 }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/missionmmalogo.png"
              alt="Mission MMA & Fitness"
              width={160}
              height={48}
              className="w-[120px] md:w-[160px] h-auto object-contain object-left"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </Link>
        </m.div>

        {/* ── Desktop nav ───────────────────────────────────────────────── */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href + "/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative pb-1 text-sm font-medium uppercase tracking-wider text-mission-gray-300 transition-colors hover:text-mission-white"
              >
                {link.label}
                {/* layoutId="nav-underline" slides the indicator between active items.
                    Requires domMax in LazyMotion — upgraded from domAnimation. */}
                {isActive && (
                  <m.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-mission-red"
                    transition={{
                      type: "spring" as const,
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}

        </nav>

        {/* ── Desktop phone ─────────────────────────────────────────────── */}
        <a
          href="tel:3122651856"
          className="hidden items-center gap-1.5 text-sm text-mission-gray-300 hover:text-mission-white md:flex"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          312-265-1856
        </a>

        {/* ── Desktop CTA — pulsing ring via cta-pulse @keyframes ──────── */}
        <Link
          href="/book"
          className="hidden rounded-md bg-mission-red px-5 py-2 text-sm font-bold uppercase tracking-wider text-mission-white transition-colors hover:bg-mission-red-dark md:inline-flex"
          style={
            reduced
              ? undefined
              : { animation: "cta-pulse 2s ease-in-out infinite" }
          }
        >
          Free Trial
        </Link>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-mission-white hover:bg-white/5 md:hidden"
          >
            <HamburgerIcon isOpen={open} reduced={reduced} />
          </SheetTrigger>

          {/* ── Mobile Sheet — slides in from right ───────────────────── */}
          <SheetContent
            side="right"
            className="w-full max-w-sm border-l border-white/10 bg-mission-black p-0 text-mission-white"
            showCloseButton={false}
          >
            <div className="flex h-full flex-col">
              {/* Sheet header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <SheetTitle className="font-display text-lg uppercase text-mission-white">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation menu
                </SheetDescription>
              </div>

              {/* Staggered nav body — links animate in 50ms apart */}
              <m.nav
                className="flex-1 overflow-y-auto px-6 py-6"
                aria-label="Mobile primary"
                variants={reduced ? undefined : MOBILE_NAV_CONTAINER}
                initial={reduced ? undefined : "hidden"}
                animate={reduced ? undefined : "visible"}
              >
                <div className="space-y-1">
                  {PRIMARY_NAV.map((link) => (
                    <m.div
                      key={link.href}
                      variants={reduced ? undefined : FADE_UP}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-3 text-base font-medium uppercase tracking-wider text-mission-gray-300 hover:bg-white/5 hover:text-mission-white"
                      >
                        {link.label}
                      </Link>
                    </m.div>
                  ))}
                </div>

                {/* Program links */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="px-3 pb-2 font-display text-xs uppercase tracking-wider text-mission-gray-500">
                    Programs
                  </div>
                  <div className="space-y-1">
                    {PROGRAM_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2.5 text-sm text-mission-gray-300 hover:bg-white/5 hover:text-mission-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </m.nav>

              {/* Phone */}
              <div className="border-t border-white/10 px-6 py-5">
                <a
                  href="tel:3122651856"
                  className="flex items-center gap-2 text-sm text-mission-gray-300 hover:text-mission-white"
                >
                  <Phone className="h-4 w-4 text-mission-red" aria-hidden="true" />
                  312-265-1856
                </a>
              </div>

              {/* Sticky CTA */}
              <div className="border-t border-white/10 p-6">
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-mission-red px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-mission-white transition-colors hover:bg-mission-red-dark"
                >
                  Claim Your Free Trial
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
