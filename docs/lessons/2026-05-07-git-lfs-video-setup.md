---
date: 2026-05-07
title: Git LFS Video Asset Setup
---

# Git LFS Video Asset Setup

## What we did

Added three MP4 video files to `public/videos/` via Git LFS and extracted JPEG poster frames for each.

## Why Git LFS over Mux

Mux is the right call for video-heavy production apps (adaptive bitrate, CDN streaming, analytics). For this project the three files were ~10–20MB each and are served statically by Vercel. LFS free tier gives 1GB storage + 1GB bandwidth/month — enough for a low-traffic marketing site. Mux's $20/mo minimum wasn't justified at this stage. **Revisit if Vercel bandwidth costs spike or if video quality complaints arise.**

## Exact commands

### LFS setup (run once per machine, then once per repo)
```bash
brew install git-lfs      # installs the binary
git lfs install           # registers LFS hooks in ~/.gitconfig
git lfs track "public/videos/*.mp4"   # writes .gitattributes rule
```

### Poster frame extraction
```bash
ffmpeg -i public/videos/mission_hero.mp4        -ss 00:00:02 -frames:v 1 -q:v 2 public/videos/mission_hero.jpg
ffmpeg -i public/videos/mission_walkthrough.mp4 -ss 00:00:02 -frames:v 1 -q:v 2 public/videos/mission_walkthrough.jpg
ffmpeg -i public/videos/mission_promo.mp4        -ss 00:00:02 -frames:v 1 -q:v 2 public/videos/mission_promo.jpg
```

`-q:v 2` = near-lossless JPEG quality. `2s` into the video gives a representative frame that isn't a black fade-in.

## Gotchas

### ffmpeg "image sequence pattern" warning
When writing a single JPEG (not a numbered sequence), ffmpeg prints:
> `The specified filename '...' does not contain an image sequence pattern`

This is **not a fatal error**. The file is written correctly. Suppress it with `-update 1` in newer ffmpeg builds, or just ignore it.

### LFS must be installed before `git add`
If you `git add` the MP4 files **before** running `git lfs track`, git stages them as raw binary blobs. The files must be removed from the index and re-added after the `.gitattributes` rule is in place. Check with `git lfs ls-files` — LFS-tracked files show a short OID hash, not the filename alone.

### Portrait vs landscape
All three source videos are 720×1280 (portrait). This is normal for phone-shot gym footage. When integrating into a landscape hero section, CSS `object-fit: cover` + `object-position: center` handle the crop. The poster JPEGs will also be portrait — no need to re-extract at a different resolution.

### GitHub LFS free tier limits
- Storage: 1GB (cumulative across all files ever pushed)
- Bandwidth: 1GB/month (counted on every clone/download, not just unique visitors)

At ~45MB for all three MP4s, storage is fine. Bandwidth depends on how often the repo is cloned. Monitor via GitHub → Billing → Git LFS. Upgrade to a data pack ($5/50GB) if needed.

## Video naming convention

- Lowercase, underscores: `mission_hero.mp4`, `mission_walkthrough.mp4`, `mission_promo.mp4`
- Paired `.mp4` + `.jpg` siblings in the same directory
- Descriptive prefix matching the intended phase/location

## File sizes (at time of commit)

| File | Size | Dimensions |
|---|---|---|
| `mission_hero.mp4` | 19MB | — |
| `mission_hero.jpg` | 102KB | 720×1280 |
| `mission_walkthrough.mp4` | 15MB | — |
| `mission_walkthrough.jpg` | 65KB | 720×1280 |
| `mission_promo.mp4` | 10MB | — |
| `mission_promo.jpg` | 117KB | 720×1280 |
