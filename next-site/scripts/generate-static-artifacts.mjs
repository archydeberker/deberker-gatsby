import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://archy.deberker.com').replace(/\/$/, '');
const siteName = 'Archy de Berker';
const siteDescription = 'Blog and notes on climate, data, software, and work.';
const siteLanguage = 'en-gb';

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function getPosts() {
  const entries = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith('.mdx'))
      .map(async (entry) => {
        const slug = entry.replace(/\.mdx$/, '');
        const file = await fs.readFile(path.join(POSTS_DIR, entry), 'utf8');
        const { data } = matter(file);

        return {
          slug,
          title: String(data.title ?? slug),
          date: String(data.date ?? new Date(0).toISOString()),
          excerpt: data.excerpt ? String(data.excerpt) : '',
          tags:
            typeof data.tags === 'string'
              ? [String(data.tags)]
              : Array.isArray(data.tags)
                ? data.tags.map((tag) => String(tag))
                : [],
        };
      }),
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function writeRss(posts) {
  const lastBuildDate = new Date(posts[0]?.date ?? Date.now()).toUTCString();
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `\n    <category>${escapeXml(tag)}</category>`)
        .join('');

      return `\n  <item>\n    <title>${escapeXml(post.title)}</title>\n    <link>${link}</link>\n    <guid isPermaLink="true">${link}</guid>\n    <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n    <description>${escapeXml(post.excerpt)}</description>${categories}\n  </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>${escapeXml(siteName)}</title>\n  <link>${siteUrl}</link>\n  <description>${escapeXml(siteDescription)}</description>\n  <language>${siteLanguage}</language>\n  <lastBuildDate>${lastBuildDate}</lastBuildDate>\n  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${items}\n</channel>\n</rss>\n`;

  await fs.writeFile(path.join(PUBLIC_DIR, 'rss.xml'), xml, 'utf8');
}

async function writeSitemap(posts) {
  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0', changeFrequency: 'weekly' },
    { loc: `${siteUrl}/blog`, priority: '0.9', changeFrequency: 'weekly' },
    { loc: `${siteUrl}/about`, priority: '0.8', changeFrequency: 'monthly' },
    ...posts.map((post) => ({
      loc: `${siteUrl}/blog/${post.slug}`,
      priority: '0.8',
      changeFrequency: 'monthly',
      lastModified: new Date(post.date).toISOString(),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((entry) => {
      const lastModified = entry.lastModified ? `\n    <lastmod>${entry.lastModified}</lastmod>` : '';
      return `  <url>\n    <loc>${entry.loc}</loc>\n    <changefreq>${entry.changeFrequency}</changefreq>\n    <priority>${entry.priority}</priority>${lastModified}\n  </url>`;
    })
    .join('\n')}\n</urlset>\n`;

  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
}

async function writeRedirects(posts) {
  const redirects = posts
    .map((post) => `/${post.slug} /blog/${post.slug} 308!`)
    .join('\n');

  await fs.writeFile(path.join(PUBLIC_DIR, '_redirects'), `${redirects}\n`, 'utf8');
}

async function main() {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const posts = await getPosts();
  await Promise.all([writeRss(posts), writeSitemap(posts), writeRedirects(posts)]);
}

await main();
