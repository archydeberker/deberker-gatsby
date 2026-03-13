import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const PUBLIC_IMPORTS_DIR = path.join(process.cwd(), 'public/imported');
const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;
const AUTH_TOKEN = process.env.WORDPRESS_AUTH_TOKEN;
const PAGE_SIZE = 50;

if (!GRAPHQL_URL) {
  throw new Error('Missing WORDPRESS_GRAPHQL_URL. Add it to your environment first.');
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndown.use(gfm);

const downloadedAssetCache = new Map();

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`WordPress GraphQL request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(`WordPress GraphQL error: ${JSON.stringify(payload.errors)}`);
  }

  return payload.data;
}

function safeSlug(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function escapeInline(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, ' ')
    .trim();
}

function normalizeUrl(rawUrl) {
  if (!rawUrl) {
    return null;
  }

  let url = String(rawUrl).trim();
  if (!url) {
    return null;
  }

  url = url.replace(/&amp;/g, '&').replace(/&#038;/g, '&');

  if (url.startsWith('//')) {
    url = `https:${url}`;
  } else if (url.startsWith('/')) {
    const wpOrigin = new URL(GRAPHQL_URL).origin;
    url = `${wpOrigin}${url}`;
  }

  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function collectImageUrlsFromHtml(html) {
  const urls = new Set();
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

  for (const match of html.matchAll(regex)) {
    const normalized = normalizeUrl(match[1]);
    if (normalized) {
      urls.add(normalized);
    }
  }

  return [...urls];
}

function extractEmbeds(html) {
  const embeds = [];
  let next = html;

  const patterns = [
    /<figure[^>]*wp-block-embed[\s\S]*?<\/figure>/gi,
    /<iframe[\s\S]*?<\/iframe>/gi,
    /<blockquote[^>]*twitter-tweet[\s\S]*?<\/blockquote>(?:\s*<script[^>]*platform\.twitter\.com\/widgets\.js[^>]*><\/script>)?/gi,
  ];

  for (const pattern of patterns) {
    next = next.replace(pattern, (fullMatch) => {
      const token = `__EMBED_BLOCK_${embeds.length}__`;
      embeds.push(fullMatch);
      return `\n\n${token}\n\n`;
    });
  }

  return { htmlWithoutEmbeds: next, embeds };
}

function normalizeEmbedHtml(html) {
  return html
    .replace(/src=["']\/\//gi, 'src="https://')
    .replace(/href=["']\/\//gi, 'href="https://')
    .replace(/<br>/gi, '<br />')
    .replace(/<script[^>]*platform\.twitter\.com\/widgets\.js[^>]*><\/script>/gi, '')
    .replace(/\sstyle=(\"[^\"]*\"|'[^']*')/gi, '')
    .replace(/<\/?(figure|div|figcaption)[^>]*>/gi, '')
    .trim();
}

function stripImageAltAttributes(html) {
  return html.replace(/\salt=(\"[^\"]*\"|'[^']*')/gi, '');
}

function stripHtmlTitleAttributes(html) {
  return html.replace(
    /\stitle=(\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*')/gi,
    '',
  );
}

function replaceLegacyFormulaImages(html) {
  return html.replace(
    /<img[^>]*src=["']http:\/\/chart\.apis\.google\.com\/chart\?[^"']*["'][^>]*>/gi,
    (tag) => {
      const altMatch = tag.match(/\salt=(\"([^\"]*)\"|'([^']*)')/i);
      const alt = altMatch?.[2] || altMatch?.[3] || '';
      const cleanedAlt = alt.replace(/<[^>]+>/g, '').trim();
      return cleanedAlt ? `<span>${cleanedAlt}</span>` : '<span>[equation]</span>';
    },
  );
}

function restoreEmbeds(markdown, embeds) {
  let next = markdown;

  for (let i = 0; i < embeds.length; i += 1) {
    const token = `__EMBED_BLOCK_${i}__`;
    const embedHtml = normalizeEmbedHtml(embeds[i]);
    const escapedToken = token.replaceAll('_', '\\_');
    next = replaceAll(next, token, `\n\n${embedHtml}\n\n`);
    next = replaceAll(next, escapedToken, `\n\n${embedHtml}\n\n`);
  }

  return next;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '--');
}

function extractCodeTables(html) {
  const codeBlocks = [];
  const htmlWithoutTables = html.replace(
    /<table[^>]*class=["'][^"']*highlight[^"']*["'][\s\S]*?<\/table>/gi,
    (tableHtml) => {
      const lines = [];
      const lineRegex = /<td[^>]*class=["'][^"']*blob-code[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi;

      for (const match of tableHtml.matchAll(lineRegex)) {
        const rawLine = match[1]
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '');
        lines.push(decodeHtmlEntities(rawLine).replace(/\u00a0/g, ' '));
      }

      const code = lines.join('\n').trimEnd();
      const token = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(code);
      return `\n\n${token}\n\n`;
    },
  );

  return { htmlWithoutTables, codeBlocks };
}

function restoreCodeBlocks(markdown, codeBlocks) {
  let next = markdown;

  for (let i = 0; i < codeBlocks.length; i += 1) {
    const token = `__CODE_BLOCK_${i}__`;
    const escapedToken = token.replaceAll('_', '\\_');
    const codeBlock = `\n\n\`\`\`text\n${codeBlocks[i]}\n\`\`\`\n\n`;
    next = replaceAll(next, token, codeBlock);
    next = replaceAll(next, escapedToken, codeBlock);
  }

  return next;
}

function escapeUnsafeAngles(markdown) {
  return markdown.replace(/<(?![A-Za-z/!])/g, '&lt;');
}

function stripGistCssLines(markdown) {
  return markdown.replace(/^\s*\.gist table\s*\{[^}]*\}\s*$/gm, '');
}

function unescapeBackslashQuotes(markdown) {
  return markdown.replace(/\\"/g, '"');
}

function escapeBrokenInlineCodeTags(markdown) {
  return markdown.replace(/<code\s+([^>]+)>/gi, '&lt;code $1&gt;');
}

function replaceAll(text, from, to) {
  if (!from || from === to) {
    return text;
  }
  return text.split(from).join(to);
}

function guessExtensionFromContentType(contentType) {
  if (!contentType) {
    return '.bin';
  }

  const clean = contentType.split(';')[0].trim().toLowerCase();
  if (clean === 'image/jpeg') return '.jpg';
  if (clean === 'image/png') return '.png';
  if (clean === 'image/webp') return '.webp';
  if (clean === 'image/gif') return '.gif';
  if (clean === 'image/svg+xml') return '.svg';
  if (clean === 'image/avif') return '.avif';
  return '.bin';
}

async function downloadAsset(assetUrl, postSlug) {
  if (downloadedAssetCache.has(assetUrl)) {
    return downloadedAssetCache.get(assetUrl);
  }

  const response = await fetch(assetUrl);
  if (!response.ok) {
    throw new Error(`Failed to download asset: ${assetUrl} (${response.status})`);
  }

  const urlObj = new URL(assetUrl);
  const rawBaseName = path.basename(urlObj.pathname) || 'asset';
  const extFromName = path.extname(rawBaseName);
  const baseNameNoExt = rawBaseName.replace(/\.[a-zA-Z0-9]+$/, '') || 'asset';
  const hash = crypto.createHash('sha1').update(assetUrl).digest('hex').slice(0, 10);
  const extension = extFromName || guessExtensionFromContentType(response.headers.get('content-type'));
  const safeBaseName = safeSlug(baseNameNoExt) || 'asset';
  const filename = `${safeBaseName}-${hash}${extension}`;

  const outputDir = path.join(PUBLIC_IMPORTS_DIR, postSlug);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, filename);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);

  const publicPath = `/imported/${postSlug}/${filename}`;
  downloadedAssetCache.set(assetUrl, publicPath);
  return publicPath;
}

async function localizeAssets({ postSlug, markdown, embeds, featuredImage }) {
  let nextMarkdown = markdown;
  const nextEmbeds = [...embeds];
  let nextFeaturedImage = featuredImage;

  const markdownImageRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const markdownImageUrls = new Set();

  for (const match of nextMarkdown.matchAll(markdownImageRegex)) {
    const normalized = normalizeUrl(match[1]);
    if (normalized) {
      markdownImageUrls.add(normalized);
    }
  }

  const htmlImageUrls = new Set();
  for (const embed of nextEmbeds) {
    for (const url of collectImageUrlsFromHtml(embed)) {
      htmlImageUrls.add(url);
    }
  }

  const allAssetUrls = new Set([...markdownImageUrls, ...htmlImageUrls]);

  if (nextFeaturedImage) {
    const normalizedFeatured = normalizeUrl(nextFeaturedImage);
    if (normalizedFeatured) {
      allAssetUrls.add(normalizedFeatured);
    }
  }

  const replacementMap = new Map();

  for (const assetUrl of allAssetUrls) {
    try {
      const localPath = await downloadAsset(assetUrl, postSlug);
      replacementMap.set(assetUrl, localPath);
    } catch (error) {
      console.warn(
        `Warning: could not download asset for ${postSlug}: ${assetUrl} (${error instanceof Error ? error.message : error})`,
      );
    }
  }

  for (const [assetUrl, localPath] of replacementMap.entries()) {
    nextMarkdown = replaceAll(nextMarkdown, assetUrl, localPath);

    const encodedAmpersands = assetUrl.replace(/&/g, '&amp;');
    if (encodedAmpersands !== assetUrl) {
      nextMarkdown = replaceAll(nextMarkdown, encodedAmpersands, localPath);
    }

    for (let i = 0; i < nextEmbeds.length; i += 1) {
      nextEmbeds[i] = replaceAll(nextEmbeds[i], assetUrl, localPath);
      if (encodedAmpersands !== assetUrl) {
        nextEmbeds[i] = replaceAll(nextEmbeds[i], encodedAmpersands, localPath);
      }
    }

    const normalizedFeatured = nextFeaturedImage ? normalizeUrl(nextFeaturedImage) : null;
    if (normalizedFeatured === assetUrl) {
      nextFeaturedImage = localPath;
    }
  }

  return {
    markdown: nextMarkdown,
    embeds: nextEmbeds,
    featuredImage: nextFeaturedImage,
  };
}

function buildFrontmatter(post) {
  const tags = post.tags?.nodes?.map((tag) => tag.name).filter(Boolean) ?? [];
  const lines = [
    '---',
    `title: "${escapeInline(post.title)}"`,
    `date: "${escapeInline(post.date)}"`,
    `slug: "${escapeInline(post.slug)}"`,
  ];

  if (post.excerpt) {
    const excerptMarkdown = turndown.turndown(post.excerpt);
    lines.push(`excerpt: "${escapeInline(excerptMarkdown)}"`);
  }

  if (tags.length > 0) {
    lines.push('tags:');
    for (const tag of tags) {
      lines.push(`  - "${escapeInline(tag)}"`);
    }
  }

  if (post.featuredImage) {
    lines.push(`featuredImage: "${escapeInline(post.featuredImage)}"`);
  }

  lines.push('---');
  return lines.join('\n');
}

async function fetchAllPosts() {
  const query = `
    query FetchPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { status: PUBLISH }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          slug
          title
          date
          excerpt
          content
          tags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const allPosts = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const data = await graphqlRequest(query, { first: PAGE_SIZE, after });
    const connection = data?.posts;

    if (!connection) {
      throw new Error('No posts field returned from GraphQL response.');
    }

    allPosts.push(...connection.nodes);
    hasNextPage = connection.pageInfo?.hasNextPage ?? false;
    after = connection.pageInfo?.endCursor ?? null;
  }

  return allPosts;
}

async function writePost(post) {
  const slug = safeSlug(post.slug || post.title || `post-${Date.now()}`);

  const sanitizedHtml = replaceLegacyFormulaImages(
    stripHtmlTitleAttributes(stripImageAltAttributes(post.content ?? '')),
  );
  const { htmlWithoutTables, codeBlocks } = extractCodeTables(sanitizedHtml);
  const { htmlWithoutEmbeds, embeds } = extractEmbeds(htmlWithoutTables);
  const markdownNoEmbeds = turndown.turndown(htmlWithoutEmbeds);

  const localized = await localizeAssets({
    postSlug: slug,
    markdown: markdownNoEmbeds,
    embeds,
    featuredImage: post.featuredImage?.node?.sourceUrl,
  });

  let markdown = restoreEmbeds(localized.markdown, localized.embeds);
  markdown = restoreCodeBlocks(markdown, codeBlocks);
  markdown = stripGistCssLines(markdown);
  markdown = escapeUnsafeAngles(markdown);
  markdown = unescapeBackslashQuotes(markdown);
  markdown = escapeBrokenInlineCodeTags(markdown);
  const frontmatter = buildFrontmatter({
    ...post,
    slug,
    featuredImage: localized.featuredImage,
  });
  const fileContents = `${frontmatter}\n\n${markdown}\n`;
  const outputPath = path.join(POSTS_DIR, `${slug}.mdx`);

  await fs.writeFile(outputPath, fileContents, 'utf8');
  return outputPath;
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_IMPORTS_DIR, { recursive: true });

  const posts = await fetchAllPosts();
  if (posts.length === 0) {
    console.log('No published posts found.');
    return;
  }

  let written = 0;
  for (const post of posts) {
    await writePost(post);
    written += 1;
  }

  console.log(`Imported ${written} posts to ${POSTS_DIR}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
