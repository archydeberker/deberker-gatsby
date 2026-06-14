import { formatMonthYear, readingTime, type Post } from '@/lib/mdx';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
  basePath: string;
  startNumber?: number;
  total?: number;
  range?: string;
  showHead?: boolean;
}

export default function PostList({
  posts,
  basePath,
  startNumber = 1,
  total,
  range,
  showHead = true,
}: PostListProps) {
  const count = total ?? posts.length;

  return (
    <section className="A-list">
      {showHead ? (
        <div className="A-list-head">
          <span className="eyebrow">Writing</span>
          <span className="count">
            {count} essays{range ? ` · ${range}` : ''}
          </span>
        </div>
      ) : null}

      {posts.map((post, index) => {
        const n = String(startNumber + index).padStart(2, '0');
        const topic = post.frontmatter.tags?.[0];
        return (
          <Link
            key={post.slug}
            href={`${basePath}/${post.slug}`}
            className="A-row"
          >
            <div className="A-num">{n}</div>
            <div className="A-thumb">
              {post.frontmatter.featuredImage ? (
                <img src={post.frontmatter.featuredImage} alt={post.frontmatter.title} />
              ) : (
                <span className="n">{n}</span>
              )}
            </div>
            <div className="A-main">
              <h2 className="A-title">{post.frontmatter.title}</h2>
              {post.frontmatter.excerpt ? (
                <p className="A-blurb">{post.frontmatter.excerpt}</p>
              ) : null}
            </div>
            <div className="A-meta">
              <span className="date">{formatMonthYear(post.frontmatter.date)}</span>
              <span className="sub">{readingTime(post.content)} min read</span>
              {topic ? <span className="A-tag">{topic}</span> : null}
            </div>
          </Link>
        );
      })}
    </section>
  );
}
