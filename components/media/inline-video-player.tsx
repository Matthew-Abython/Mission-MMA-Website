"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InlineVideoPlayerProps {
  src: string;
  poster: string;
  orientation?: "portrait" | "landscape";
  maxHeightDesktop?: number;
  maxHeightMobile?: number;
  loop?: boolean;
  autoPlayOnScroll?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function InlineVideoPlayer({
  src,
  poster,
  orientation = "portrait",
  maxHeightDesktop = 600,
  loop = true,
  autoPlayOnScroll = true,
  className,
  ariaLabel,
}: InlineVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Threshold 0.4: 40% visibility before autoplay — avoids flicker at scroll edges
    if (!autoPlayOnScroll || reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlayOnScroll, reducedMotion]);

  const isPortrait = orientation === "portrait";
  // Constrain width so height never exceeds maxHeightDesktop at native aspect ratio.
  // Portrait 9:16 → maxWidth = maxHeightDesktop × 9/16
  // Landscape 16:9 → maxWidth = maxHeightDesktop × 16/9
  const maxWidth = isPortrait
    ? Math.round(maxHeightDesktop * (9 / 16))
    : Math.round(maxHeightDesktop * (16 / 9));

  return (
    <div
      className={cn(
        "w-full bg-mission-gray-900 py-12 md:py-16 flex justify-center items-center",
        className
      )}
    >
      {/* Left accent bar + video frame */}
      <div
        className="relative border-l-2 border-mission-red"
        style={{ width: "80vw", maxWidth: `${maxWidth}px` }}
      >
        {/* Aspect-ratio container — exactly matches native video dimensions */}
        <div
          className={cn(
            "relative overflow-hidden",
            isPortrait ? "aspect-[9/16]" : "aspect-video"
          )}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            loop={loop}
            preload="metadata"
            controls
            aria-label={ariaLabel}
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        </div>

        {/* Bottom red gradient accent — ties to brand color */}
        <div className="h-[2px] bg-gradient-to-r from-mission-red via-mission-red/50 to-transparent" />
      </div>
    </div>
  );
}
