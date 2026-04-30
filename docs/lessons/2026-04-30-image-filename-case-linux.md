---
date: 2026-04-30
title: Uppercase image file extensions 404 on Vercel (Linux filesystem)
---

## What the problem was
A gym photo was uploaded as `mixedmartialarts.JPG` (uppercase extension). The code referenced `/mixedmartialarts.jpg` (lowercase). It worked locally on macOS (case-insensitive filesystem) but would 404 in production on Vercel (Linux, case-sensitive filesystem).

## What the fix was
Renamed the file: `mv mixedmartialarts.JPG mixedmartialarts.jpg` before committing.

## Why it happened
macOS silently tolerates case mismatches. Vercel runs on Linux where `/Kickboxing_2.jpg` and `/kickboxing_2.jpg` are different files.

## What to watch for in the future
- Always verify image filenames are all-lowercase extensions (`.jpg`, `.png`, `.webp`) before committing to `/public`.
- Spaces in filenames also cause problems — use underscores or hyphens instead.
- Do a preflight `ls public/` check and compare exact filenames against code references before any image deploy.
- Rule: **filename in code must match disk exactly, including case**.
