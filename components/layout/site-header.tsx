"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const PRIMARY_NAV = [
  { href: "/classes", label: "Classes" },
  { href: "/schedule", label: "Schedule" },
  { href: "/instructors", label: "Coaches" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const PROGRAM_LINKS = [
  { href: "/classes/brazilian-jiu-jitsu", label: "Brazilian Jiu-Jitsu" },
  { href: "/classes/muay-thai", label: "Muay Thai" },
  { href: "/classes/mma", label: "MMA" },
  { href: "/classes/womens-bjj", label: "Women's BJJ" },
  { href: "/classes/kids", label: "Kids Martial Arts" },
  { href: "/classes/open-mat", label: "Open Mat" },
  { href: "/classes/strength-conditioning", label: "Strength & Conditioning" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-mission-black/85 backdrop-blur-md supports-[backdrop-filter]:bg-mission-black/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Wordmark / home link */}
        <Link
          href="/"
          className="font-display text-lg uppercase tracking-wider text-mission-white hover:text-mission-red md:text-xl"
        >
          Mission MMA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-mission-gray-300 transition-colors hover:text-mission-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-sm font-medium uppercase tracking-wider text-mission-red transition-colors hover:text-mission-white"
          >
            Book Free Trial
          </Link>
        </nav>

        {/* Desktop phone */}
        <a
          href="tel:3122651856"
          className="hidden items-center gap-1.5 text-sm text-mission-gray-300 hover:text-mission-white md:flex"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          312-265-1856
        </a>

        {/* Desktop CTA */}
        <Link
          href="/free-trial"
          className="hidden rounded-md bg-mission-red px-5 py-2 text-sm font-bold uppercase tracking-wider text-mission-white transition-colors hover:bg-mission-red-dark md:inline-flex"
        >
          Free Trial
        </Link>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="rounded-md p-2 text-mission-white hover:bg-white/5 md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-sm border-l border-white/10 bg-mission-black p-0 text-mission-white"
            showCloseButton={false}
          >
            <div className="flex h-full flex-col">
              {/* Header bar in the sheet */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <SheetTitle className="font-display text-lg uppercase text-mission-white">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation menu
                </SheetDescription>
              </div>

              {/* Scrollable nav body */}
              <nav
                className="flex-1 overflow-y-auto px-6 py-6"
                aria-label="Mobile primary"
              >
                <div className="space-y-1">
                  {PRIMARY_NAV.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base font-medium uppercase tracking-wider text-mission-gray-300 hover:bg-white/5 hover:text-mission-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base font-medium uppercase tracking-wider text-mission-red hover:bg-white/5 hover:text-mission-white"
                  >
                    Book Free Trial
                  </Link>
                </div>

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
              </nav>

              {/* Phone number in mobile menu */}
              <div className="border-t border-white/10 px-6 py-5">
                <a
                  href="tel:3122651856"
                  className="flex items-center gap-2 text-sm text-mission-gray-300 hover:text-mission-white"
                >
                  <Phone className="h-4 w-4 text-mission-red" aria-hidden="true" />
                  312-265-1856
                </a>
              </div>

              {/* Sticky CTA at the bottom of the sheet */}
              <div className="border-t border-white/10 p-6">
                <Link
                  href="/free-trial"
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
