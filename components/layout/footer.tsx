import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { GYM } from "@/lib/schema";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const PROGRAM_LINKS = [
  { href: "/classes/brazilian-jiu-jitsu", label: "Brazilian Jiu-Jitsu" },
  { href: "/classes/muay-thai", label: "Muay Thai" },
  { href: "/classes/mma", label: "MMA" },
  { href: "/classes/womens-bjj", label: "Women's BJJ" },
  { href: "/classes/kids", label: "Kids Martial Arts" },
  { href: "/classes/open-mat", label: "Open Mat" },
  { href: "/classes/strength-conditioning", label: "Strength & Conditioning" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/instructors", label: "Coaches" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
  { href: "/free-trial", label: "Free Trial" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/MissionMMAchicago",
    label: "Facebook",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/missionmmachi",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  { href: "https://twitter.com/MissionMMAChi", label: "Twitter / X", Icon: XIcon },
  {
    href: "https://www.youtube.com/channel/UCfPaDzFvM5dpNllcSno5LXg",
    label: "YouTube",
    Icon: YoutubeIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-mission-gray-900 text-mission-gray-300">
      {/* Top: 4-column grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: NAP + socials */}
          <div className="space-y-5">
            <div className="font-display text-2xl uppercase text-mission-white">
              Mission MMA
            </div>
            <address className="space-y-3 not-italic">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-mission-red"
                  aria-hidden="true"
                />
                <span className="text-sm">
                  1620 W Carroll Ave
                  <br />
                  Chicago, IL 60612
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="h-4 w-4 shrink-0 text-mission-red"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${GYM.telephone}`}
                  className="text-sm hover:text-mission-white"
                >
                  312-265-1856
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="h-4 w-4 shrink-0 text-mission-red"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${GYM.email}`}
                  className="text-sm hover:text-mission-white"
                >
                  {GYM.email}
                </a>
              </div>
            </address>
            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-mission-gray-300 transition-colors hover:border-mission-red hover:text-mission-red"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Programs */}
          <div className="space-y-4">
            <h2 className="font-display text-sm uppercase tracking-wider text-mission-white">
              Programs
            </h2>
            <ul className="space-y-2">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-mission-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h2 className="font-display text-sm uppercase tracking-wider text-mission-white">
              Company
            </h2>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-mission-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Mini lead form */}
          <div className="space-y-4">
            <h2 className="font-display text-sm uppercase tracking-wider text-mission-white">
              Get a Free Class
            </h2>
            <p className="text-sm">
              Drop your first name and phone — we&apos;ll text within 24 hours.
            </p>
            {/* TODO Phase 3: wire this form to the n8n webhook server action.
                Markup is structurally identical to the main lead form so the same
                form component can be reused with a "compact" variant prop. */}
            <form
              className="space-y-2"
              action="/free-trial"
              method="get"
              aria-label="Quick free trial signup"
            >
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                aria-label="First name"
                required
                className="w-full rounded-md border border-white/10 bg-mission-black px-3 py-2 text-sm text-mission-white placeholder:text-mission-gray-500 focus:border-mission-red focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                aria-label="Phone number"
                required
                className="w-full rounded-md border border-white/10 bg-mission-black px-3 py-2 text-sm text-mission-white placeholder:text-mission-gray-500 focus:border-mission-red focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-mission-red px-3 py-2 text-sm font-bold uppercase tracking-wider text-mission-white transition-colors hover:bg-mission-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-gray-900"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom strip: copyright + small links */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-mission-gray-500 md:flex-row md:px-8">
          <div>
            &copy; {new Date().getFullYear()} Mission MMA &amp; Fitness, Inc. All
            rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Chicago, IL</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Mission+MMA+%26+Fitness%2C+1620+W+Carroll+Ave%2C+Chicago%2C+IL+60612"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mission-white"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
