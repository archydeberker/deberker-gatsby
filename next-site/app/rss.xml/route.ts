import { getAllPosts } from '@/lib/mdx';
import { rssPath, siteDescription, siteLanguage, siteName, siteUrl } from '@/lib/site';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllPosts();
  const lastBuildDate = new Date(posts[0]?.frontmatter.date ?? Date.now()).toUTCString();

  const items = posts
    .map((post) => {
      const title = escapeXml(post.frontmatter.title);
      const link = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      const description = escapeXml(post.frontmatter.excerpt ?? '');
      const categories = (post.frontmatter.tags ?? [])
        .map((tag) => `\n    <category>${escapeXml(tag)}</category>`)
        .join('');

      return `\n  <item>\n    <title>${title}</title>\n    <link>${link}</link>\n    <guid isPermaLink="true">${link}</guid>\n    <pubDate>${pubDate}</pubDate>\n    <description>${description}</description>${categories}\n  </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>${escapeXml(siteName)}</title>\n  <link>${siteUrl}</link>\n  <description>${escapeXml(siteDescription)}</description>\n  <language>${siteLanguage}</language>\n  <lastBuildDate>${lastBuildDate}</lastBuildDate>\n  <atom:link href="${siteUrl}${rssPath}" rel="self" type="application/rss+xml" />${items}\n</channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
