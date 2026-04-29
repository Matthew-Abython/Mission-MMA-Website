import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mission MMA & Fitness — Chicago's Premier BJJ & Muay Thai Gym";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Programmatic OG image for all pages that do not supply a custom ogImage.
 *
 * Matches the hero's visual language: near-black background, two blurred
 * radial gradient blobs (red left-center, dark-red right), stacked text
 * block on the left, large decorative "M" lettermark on the right.
 *
 * Oswald 700 is fetched from Google Fonts at request time.
 * Inter falls back to the edge runtime's built-in sans-serif.
 */
export default async function OgImage() {
  // Load Oswald Bold from Google Fonts — parse the CDN woff2 URL from CSS
  let oswaldFontData: ArrayBuffer | null = null;
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );
    const css = await cssRes.text();
    const match = css.match(/url\(([^)]+\.woff2)\)/);
    if (match?.[1]) {
      oswaldFontData = await fetch(match[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    // Font load failure → ImageResponse falls back to system sans-serif
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Red radial blob — left-center ─────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: -120,
            top: "40%",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #C8102E 0%, transparent 70%)",
            opacity: 0.22,
            filter: "blur(60px)",
          }}
        />

        {/* ── Dark-red radial blob — right-center ───────────────────── */}
        <div
          style={{
            position: "absolute",
            right: -60,
            bottom: -60,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #1a0305 0%, transparent 70%)",
            opacity: 0.5,
            filter: "blur(80px)",
          }}
        />

        {/* ── Decorative "M" lettermark — right side, 15% opacity ───── */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: "50%",
            fontFamily: oswaldFontData ? "Oswald" : "sans-serif",
            fontWeight: 700,
            fontSize: 280,
            color: "#C8102E",
            opacity: 0.15,
            lineHeight: 1,
            display: "flex",
            transform: "translateY(-50%)",
          }}
        >
          M
        </div>

        {/* ── Left text block ────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "50%",
            display: "flex",
            flexDirection: "column",
            maxWidth: 740,
            transform: "translateY(-50%)",
          }}
        >
          {/* Thin red rule above the gym name */}
          <div
            style={{
              width: 80,
              height: 4,
              backgroundColor: "#C8102E",
              marginBottom: 28,
            }}
          />

          {/* Line 1 — gym name */}
          <div
            style={{
              fontFamily: oswaldFontData ? "Oswald" : "sans-serif",
              fontWeight: 700,
              fontSize: 64,
              color: "#F5F5F5",
              lineHeight: 1,
              marginBottom: 20,
              display: "flex",
            }}
          >
            MISSION MMA &amp; FITNESS
          </div>

          {/* Line 2 — tagline */}
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 28,
              color: "#D4D4D4",
              marginBottom: 14,
              display: "flex",
            }}
          >
            Chicago&apos;s Premier BJJ &amp; Muay Thai Gym
          </div>

          {/* Line 3 — address */}
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 20,
              color: "#737373",
              display: "flex",
            }}
          >
            1620 W Carroll Ave · West Loop · Chicago
          </div>
        </div>

        {/* ── Bottom-left URL ───────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            fontFamily: "sans-serif",
            fontSize: 16,
            color: "#737373",
            display: "flex",
          }}
        >
          missionmmachicago.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: oswaldFontData
        ? [
            {
              name: "Oswald",
              data: oswaldFontData,
              style: "normal" as const,
              weight: 700,
            },
          ]
        : [],
    }
  );
}
