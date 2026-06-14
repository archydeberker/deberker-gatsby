import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SuggestedPosts from '@/components/suggested-posts';
import {
  formatDateLong,
  getPostBySlug,
  getPostSlugs,
  getSuggestedPosts,
  readingTime,
  renderPostMdx,
} from '@/lib/mdx';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxContent = await renderPostMdx(post.content);
  const suggestedPosts = await getSuggestedPosts(slug, 2);
  const topic = post.frontmatter.tags?.[0] ?? 'Essay';

  return (
    <article className="R-article">
      <div className="R-col">
        <Link href="/" className="R-back">
          <span className="arr">←</span> Back to writing
        </Link>
        <div className="R-kicker">
          <span className="tag">{topic}</span>
          <span className="sep" />
          <span>{formatDateLong(post.frontmatter.date)}</span>
          <span className="sep" />
          <span>{readingTime(post.content)} min read</span>
        </div>

        <h1 className="R-title">{post.frontmatter.title}</h1>

        {post.frontmatter.excerpt ? <p className="R-deck">{post.frontmatter.excerpt}</p> : null}

        {post.frontmatter.featuredImage ? (
          <div className="R-hero-img">
            <img src={post.frontmatter.featuredImage} alt={post.frontmatter.title} />
          </div>
        ) : null}

        <div className="R-body">{mdxContent}</div>

        <SuggestedPosts posts={suggestedPosts} basePath="/blog" />
      </div>
    </article>
  );
}
