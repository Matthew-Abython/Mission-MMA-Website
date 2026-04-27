# Lesson: Next.js Redirect Sources Match Case-Insensitively — Self-Redirect Loop

## Problem

Three redirect rules in `next.config.ts` caused 308 self-redirect loops on the correct lowercase destination URLs:

- `/classes/Brazilian-Jiu-Jitsu` → `/classes/brazilian-jiu-jitsu`
- `/classes/MMA` → `/classes/mma`
- `/Contact` → `/contact`

Visiting `/classes/brazilian-jiu-jitsu` returned `308 → /classes/brazilian-jiu-jitsu` — an infinite redirect. This broke the `/classes/mma` and `/contact` pages entirely since Step 1.6. Only discovered in Step 2.5 when the BJJ class page was first tested in a browser/curl.

## Why It Happened

Next.js redirect `source` paths are matched **case-insensitively** by default. The `caseSensitive` option exists only for `rewrites`, not `redirects` — passing it to a redirect causes a build error ("invalid field: caseSensitive"). For the three rules above, the source string (lowercased) equals the destination, so the correct destination URL accidentally matches its own redirect rule.

## Fix

Moved the three conflicting rules out of `next.config.ts` and into `middleware.ts`, which uses exact string comparison (`EXACT_REDIRECTS[request.nextUrl.pathname]`) and is therefore case-sensitive by default.

## What to Watch For

Any redirect where `source.toLowerCase() === destination` will cause a self-redirect loop. Check this before adding new redirects:

- `/classes/Brazilian-Jiu-Jitsu` → `/classes/brazilian-jiu-jitsu` ← PROBLEM (same when lowercased)
- `/classes/Muay-Thai-Kickboxing` → `/classes/muay-thai` ← safe (different when lowercased)
- `/Gallery` → `/about` ← safe (different when lowercased)

Rule: if source slug and destination slug are identical after `.toLowerCase()`, use `middleware.ts` instead of `next.config.ts`.
