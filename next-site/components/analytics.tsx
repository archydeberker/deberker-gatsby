import Script from 'next/script';
import { fathomSiteId } from '@/lib/site';

// Loads Fathom Analytics. With the static export there is no server runtime, so we
// use Fathom's CDN script with `data-spa="auto"`, which tracks client-side route
// changes via the History API automatically — no manual pageview wiring needed.
// The site ID comes from NEXT_PUBLIC_FATHOM_SITE_ID; when unset (e.g. local dev),
// nothing is rendered so we never send traffic to a missing site.
export default function Analytics() {
  if (!fathomSiteId) {
    return null;
  }

  return (
    <Script
      src="https://cdn.usefathom.com/script.js"
      data-site={fathomSiteId}
      data-spa="auto"
      strategy="afterInteractive"
      defer
    />
  );
}
