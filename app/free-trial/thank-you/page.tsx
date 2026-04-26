import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thanks — We'll Be in Touch | Mission MMA & Fitness",
  description:
    "Thank you for reaching out to Mission MMA & Fitness. A coach will be in touch within 24 hours to schedule your free class.",
  path: "/free-trial/thank-you",
  noIndex: true,
  absoluteTitle: true,
});

export default function ThankYouPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-8 md:py-24">
      <article className="mx-auto max-w-4xl space-y-6">
        <h1>Thanks — We&apos;ll Be in Touch</h1>
        <p className="text-lg text-muted-foreground">
          Thanks for reaching out to Mission MMA &amp; Fitness. A coach will text or call you
          within 24 hours to schedule your free class.
        </p>
        <p className="text-muted-foreground">
          In the meantime, explore our{" "}
          <Link href="/schedule" className="hover:text-mission-red transition-colors">
            weekly class schedule
          </Link>{" "}
          or learn more about our{" "}
          <Link href="/classes" className="hover:text-mission-red transition-colors">
            programs
          </Link>
          .
        </p>
        <p>
          <Link href="/" className="font-bold hover:text-mission-red transition-colors">
            ← Back to home
          </Link>
        </p>
      </article>
    </main>
  );
}
