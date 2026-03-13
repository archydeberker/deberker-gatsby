import Link from 'next/link';
import { formatDate, type Post } from '@/lib/mdx';

interface SuggestedPostsProps {
  posts: Post[];
  basePath: string;
}

export default function SuggestedPosts({ posts, basePath }: SuggestedPostsProps) {
  const visiblePosts = posts.slice(0, 2);

  if (!visiblePosts.length) {
    return null;
  }

  return (
    <section className="mt-12 pt-4" aria-label="Suggested posts">
      <h2 className="mb-4 mt-0 font-sans text-[1.728rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading">
        Suggested posts
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            href={`${basePath}/${post.slug}`}
            className="block rounded-xl border border-[#d7dee7] bg-transparent p-4 text-text no-underline transition-colors hover:border-[#becad8]"
          >
            <h3 className="mb-2 mt-0 font-sans text-[1.2rem] font-bold leading-tight text-primary">
              {post.frontmatter.title}
            </h3>
            <p className="mb-2 mt-0 font-sans text-[0.833rem] text-text-muted">
              {formatDate(post.frontmatter.date)}
            </p>
            {post.frontmatter.excerpt ? (
              <p className="m-0 hidden leading-[1.45] text-text sm:block">
                {post.frontmatter.excerpt}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
