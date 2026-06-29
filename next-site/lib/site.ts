export const siteName = 'Archy de Berker';
export const siteDescription = 'Blog and notes on climate, data, software, and work.';
export const siteLanguage = 'en-gb';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://archy.deberker.com').replace(
  /\/$/,
  '',
);
export const rssPath = '/rss.xml';
// Public Fathom site ID (carried over from the legacy Gatsby config). It ships in
// the client script tag, so it is not a secret; an env var can still override it.
export const fathomSiteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID ?? 'XVRONDCU';
