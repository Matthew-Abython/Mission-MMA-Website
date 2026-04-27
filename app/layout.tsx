import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://missionmmachicago.com"),
  title: {
    default: "Mission MMA & Fitness — Chicago's Premier BJJ & Muay Thai Gym",
    template: "%s | Mission MMA & Fitness",
  },
  description:
    "Train Brazilian Jiu-Jitsu, Muay Thai, and MMA at Mission MMA & Fitness in Chicago's West Loop. High-quality instruction for adults, women, and kids. Free trial class.",
  keywords: [
    "martial arts chicago",
    "brazilian jiu jitsu chicago",
    "bjj chicago",
    "muay thai chicago",
    "mma gym chicago",
    "west loop martial arts",
  ],
  authors: [{ name: "Mission MMA & Fitness" }],
  creator: "Mission MMA & Fitness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://missionmmachicago.com",
    siteName: "Mission MMA & Fitness",
    title: "Mission MMA & Fitness — Chicago's Premier BJJ & Muay Thai Gym",
    description:
      "Train Brazilian Jiu-Jitsu, Muay Thai, and MMA at Mission MMA & Fitness in Chicago's West Loop. Free trial class.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission MMA & Fitness",
    description:
      "Chicago's premier BJJ and Muay Thai gym in the West Loop. Free trial class.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${oswald.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans">
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
        <Footer />
      </body>
    </html>
  );
}
