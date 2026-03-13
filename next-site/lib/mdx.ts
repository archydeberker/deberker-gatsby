import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx-components';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  slug?: string;
  featuredImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const TOPIC_STOPWORDS = new Set([
  'a',
  'about',
  'across',
  'all',
  'an',
  'and',
  'any',
  'are',
  'around',
  'as',
  'at',
  'after',
  'also',
  'because',
  'before',
  'been',
  'being',
  'both',
  'by',
  'between',
  'could',
  'build',
  'did',
  'does',
  'doing',
  'dont',
  'each',
  'even',
  'ever',
  'first',
  'get',
  'got',
  'had',
  'has',
  'here',
  'however',
  'if',
  'im',
  'in',
  'is',
  'it',
  'its',
  'ive',
  'lets',
  'like',
  'lot',
  'many',
  'most',
  'from',
  'new',
  'now',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'out',
  'have',
  'how',
  'much',
  'more',
  'into',
  'its',
  'just',
  'one',
  'over',
  'really',
  'right',
  'same',
  'say',
  'see',
  'seems',
  'still',
  'than',
  'then',
  'there',
  'these',
  'they',
  'thing',
  'things',
  'those',
  'through',
  'time',
  'times',
  'too',
  'very',
  'want',
  'was',
  'way',
  'well',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'why',
  'will',
  'with',
  'without',
  'work',
  'works',
  'would',
  'year',
  'years',
  'you',
  'your',
  'we',
  'us',
  'to',
  'of',
  'the',
  'their',
  'them',
  'this',
  'that',
  'these',
  'those',
  'under',
  'over',
  'post',
  'should',
  'some',
]);

export async function getPostSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries
      .filter((entry) => entry.endsWith('.mdx'))
      .map((entry) => entry.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const cleanSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(POSTS_DIR, `${cleanSlug}.mdx`);

  try {
    const file = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(file);

    return {
      slug: cleanSlug,
      frontmatter: {
        title: String(data.title ?? cleanSlug),
        date: String(data.date ?? new Date(0).toISOString()),
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        slug: data.slug ? String(data.slug) : cleanSlug,
        tags:
          typeof data.tags === 'string'
            ? [String(data.tags)]
            : Array.isArray(data.tags)
              ? data.tags.map((tag) => String(tag))
              : [],
        featuredImage: data.featuredImage ? String(data.featuredImage) : undefined,
      },
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

export async function renderPostMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
      },
    },
  });

  return content;
}

function topicTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !TOPIC_STOPWORDS.has(token));
}

function postTagSet(post: Post): Set<string> {
  return new Set((post.frontmatter.tags ?? []).map((tag) => tag.trim().toLowerCase()));
}

function postTokenSet(post: Post): Set<string> {
  const tags = post.frontmatter.tags ?? [];
  return new Set([
    ...tags.flatMap((tag) => topicTokens(tag)),
    ...topicTokens(post.frontmatter.title),
    ...topicTokens(post.frontmatter.excerpt ?? ''),
  ]);
}

function overlapCount(source: Set<string>, candidate: Set<string>): number {
  let overlap = 0;
  source.forEach((token) => {
    if (candidate.has(token)) {
      overlap += 1;
    }
  });
  return overlap;
}

export async function getSuggestedPosts(slug: string, limit = 3): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const currentPost = allPosts.find((post) => post.slug === slug);

  if (!currentPost) {
    return [];
  }

  const currentTags = postTagSet(currentPost);
  const currentTokens = postTokenSet(currentPost);

  const scoredPosts = allPosts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const candidateTags = postTagSet(post);
      const candidateTokens = postTokenSet(post);
      const tagMatches = overlapCount(currentTags, candidateTags);
      const tokenMatches = overlapCount(currentTokens, candidateTokens);
      const score =
        tagMatches > 0 || tokenMatches >= 2 ? tagMatches * 6 + tokenMatches * 2 : 0;

      return { post, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      );
    });

  const ranked = scoredPosts.filter((entry) => entry.score > 0).map((entry) => entry.post);

  if (ranked.length >= limit) {
    return ranked.slice(0, limit);
  }

  const selected = [...ranked];
  const selectedSlugs = new Set(selected.map((post) => post.slug));

  allPosts.forEach((post) => {
    if (selected.length >= limit || post.slug === slug || selectedSlugs.has(post.slug)) {
      return;
    }
    selected.push(post);
    selectedSlugs.add(post.slug);
  });

  return selected.slice(0, limit);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}
