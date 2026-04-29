import type { ReactNode, CSSProperties } from "react";

/**
 * CSS-only floating particle system for dark backgrounds.
 * No canvas, no JS animation library — pure @keyframes (particle-drift in globals.css).
 * prefers-reduced-motion is handled globally in globals.css (animation-duration: 0.01ms).
 *
 * Usage: wrap any section in <ParticleField className="...existing-section-classes...">
 * The wrapper gains position:relative + overflow:hidden; particles sit behind children.
 */

interface ParticleConfig {
  left: number;     // left position as %
  size: number;     // diameter in px (2–5)
  opacity: number;  // 0.3–0.6
  duration: number; // animation-duration in s (8–20)
  delay: number;    // animation-delay in s (0–15)
}

// 20 hand-placed particles — static array avoids Math.random() hydration mismatch.
// Left positions spread across the full width; sizes/opacities/timings varied for
// natural-looking density without clustering.
const PARTICLES: ParticleConfig[] = [
  { left:  3, size: 2, opacity: 0.35, duration: 14, delay:  0 },
  { left:  8, size: 3, opacity: 0.50, duration: 10, delay:  8 },
  { left: 14, size: 2, opacity: 0.30, duration: 18, delay:  3 },
  { left: 20, size: 4, opacity: 0.45, duration: 12, delay: 11 },
  { left: 27, size: 2, opacity: 0.55, duration: 16, delay:  1 },
  { left: 33, size: 3, opacity: 0.35, duration: 11, delay: 14 },
  { left: 40, size: 2, opacity: 0.40, duration: 20, delay:  6 },
  { left: 46, size: 5, opacity: 0.30, duration: 13, delay:  2 },
  { left: 52, size: 2, opacity: 0.50, duration:  9, delay:  9 },
  { left: 58, size: 3, opacity: 0.45, duration: 15, delay:  0 },
  { left: 64, size: 2, opacity: 0.35, duration: 17, delay:  5 },
  { left: 70, size: 4, opacity: 0.40, duration: 12, delay: 13 },
  { left: 76, size: 2, opacity: 0.30, duration: 19, delay:  4 },
  { left: 82, size: 3, opacity: 0.55, duration: 14, delay:  7 },
  { left: 88, size: 2, opacity: 0.40, duration: 10, delay: 12 },
  { left: 94, size: 4, opacity: 0.35, duration: 16, delay:  2 },
  { left:  7, size: 3, opacity: 0.45, duration: 11, delay: 15 },
  { left: 43, size: 2, opacity: 0.30, duration: 13, delay:  8 },
  { left: 73, size: 3, opacity: 0.50, duration: 17, delay: 10 },
  { left: 90, size: 2, opacity: 0.40, duration:  8, delay:  5 },
];

interface ParticleFieldProps {
  children: ReactNode;
  className?: string;
}

export function ParticleField({ children, className }: ParticleFieldProps) {
  return (
    <div className={`relative overflow-hidden${className ? ` ${className}` : ""}`}>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full"
          style={
            {
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: 0,
              pointerEvents: "none",
              backgroundColor: "var(--mission-red)",
              "--p-opacity": p.opacity,
              animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite backwards`,
            } as CSSProperties
          }
        />
      ))}
      {/* Children render above particles via normal stacking order */}
      {children}
    </div>
  );
}
