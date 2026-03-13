import { formatDate, type Post } from '@/lib/mdx';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
  basePath: string;
}

export default function PostList({ posts, basePath }: PostListProps) {
  return (
    <ol className="m-0 list-none p-0">
      {posts.map((post) => (
        <li key={post.slug}>
          <article className="mb-12">
            <Link
              href={`${basePath}/${post.slug}`}
              className="bg-gray-50/50 group block rounded-[10px] border border-transparent p-4 text-text no-underline transition-colors duration-200 hover:bg-gray-50  hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4d6df]"
            >
              <div className="grid grid-cols-1 items-start gap-x-10 sm:grid-cols-[1fr_2fr]">
                <div>
                  {post.frontmatter.featuredImage ? (
                    <img
                      src={post.frontmatter.featuredImage}
                      alt={post.frontmatter.title}
                      className="m-3 h-auto w-full"
                    />
                  ) : null}
                </div>
                <div>
                  <header className="mb-2">
                    <h2 className="mb-2 mt-0 font-sans text-3xl font-bold leading-[0.9] tracking-[-0.025em] text-primary/80 group-hover:text-primary transition-colors">
                      {post.frontmatter.title}
                    </h2>
                    <span className="inline-block font-sans text-sm text-text-muted">
                      {formatDate(post.frontmatter.date)}
                    </span>
                  </header>
                  {post.frontmatter.excerpt ? (
                    <section className=" text-text mt-1">
                      {post.frontmatter.excerpt}
                    </section>
                  ) : null}
                </div>
              </div>
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
