import Script from "next/script";

/**
 * Google Analytics 4.
 * Renders only if NEXT_PUBLIC_GA4_ID is set (currently empty until a GA4
 * property is created and the measurement ID is added to .env.local).
 *
 * When set, fires page_view events automatically and exposes window.gtag
 * for the ConversionTracking component to call generate_lead on the
 * thank-you page.
 */
export function GA4() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
