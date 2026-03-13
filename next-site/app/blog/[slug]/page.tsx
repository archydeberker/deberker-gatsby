import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SuggestedPosts from '@/components/suggested-posts';
import {
  formatDate,
  getPostBySlug,
  getPostSlugs,
  getSuggestedPosts,
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

  return (
    <article>
      <header>
        <h1 className="mb-4 mt-0 font-sans text-[2.488rem] font-black leading-[0.9] tracking-[-0.025em] text-black">
          {post.frontmatter.title}
        </h1>
        <p className="mb-4 mt-0 font-sans text-[1.2rem] text-text-muted">
          {formatDate(post.frontmatter.date)}
        </p>
        {post.frontmatter.featuredImage ? (
          <img
            src={post.frontmatter.featuredImage}
            alt={post.frontmatter.title}
            className="mb-[50px] h-auto w-full"
          />
        ) : null}
      </header>

      <section>{mdxContent}</section>

      <hr className="my-8 h-px border-0 bg-accent" />
      <SuggestedPosts posts={suggestedPosts} basePath="/blog" />
    </article>
  );
}
