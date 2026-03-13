export const siteName = 'Archy de Berker';
export const siteDescription = 'Blog and notes on climate, data, software, and work.';
export const siteLanguage = 'en-gb';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://archy.deberker.com').replace(
  /\/$/,
  '',
);
export const rssPath = '/rss.xml';
