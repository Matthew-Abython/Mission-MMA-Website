# Lesson: Revert Phase 2 — InlineVideoPlayer on /about

**Date:** 2026-05-11

---

## What was reverted

Phase 2 added a portrait video player (`components/media/inline-video-player.tsx`) to the facility section of `/about`. The component autoplayed `mission_walkthrough.mp4` (muted, looping) on scroll using `IntersectionObserver` (threshold 0.4), with native HTML5 controls and `prefers-reduced-motion` handling. It was embedded between the two facility paragraphs with a dark `bg-mission-gray-900` backdrop and a red left-border accent.

Reverted via `git revert 74fdf08` (forward revert commit `7b295fa`) — the Phase 2 commit remains in history, the working state returns to Phase 0.

## Why it was reverted

User feedback: presentation did not meet expectations and the video was not playing. The exact root cause was not isolated during this session.

## What was preserved

All Phase 0 infrastructure is intact:
- `public/videos/mission_hero.mp4` + poster
- `public/videos/mission_walkthrough.mp4` + poster
- `public/videos/mission_promo.mp4` + poster
- `.gitattributes` Git LFS tracking for `public/videos/*.mp4`
- `docs/lessons/2026-05-07-git-lfs-video-setup.md`
- "Video Assets" section in `HANDOFF-GUIDE.md`

The videos are ready for a different presentation approach.

## Open questions for the next attempt

**Was it a playback failure or a presentation issue?**
The video "not playing" could mean:
1. The `IntersectionObserver` threshold (0.4) was too high — 40% of a ~550px portrait video is ~220px, which may not have been visible during testing
2. The browser blocked autoplay for a reason other than reduced-motion (e.g. a browser policy difference on the testing device)
3. The video file itself had a problem (LFS pointer not resolved, network timeout on 15 MB file)
4. The `muted` + `playsInline` + `controls` combination was correct, so a different cause is likely

**Was the portrait framing the problem?**
The dark `bg-mission-gray-900` container with left red accent was intended to make the empty horizontal space around the 9:16 video look deliberate. If it looked broken (letterboxed, awkward), a different layout — such as a full-width horizontal frame that crops the video, or a narrower content column — may be more appropriate.

**Was the IntersectionObserver threshold too high?**
At threshold 0.4, the video won't autoplay until 40% is in the viewport. For a tall portrait video (~550px at 80vw on mobile), that means ~220px must scroll into view before playback starts. A lower threshold (0.2–0.25) or a click-to-play approach may be more reliable.

## Notes

This is a normal iteration — not a critical incident. The Phase 0 foundation is solid and the videos are ready. The next attempt should clarify the root cause before implementing again. Consider testing the video URL directly in a browser (`/videos/mission_walkthrough.mp4`) before building the component wrapper to confirm the file resolves correctly from Vercel's LFS-backed static serving.
