import Link from 'next/link';
import { type Post } from '@/lib/mdx';

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
    <nav className="R-next" aria-label="Suggested posts">
      {visiblePosts.map((post) => (
        <Link key={post.slug} href={`${basePath}/${post.slug}`}>
          <span className="lab">Read next</span>
          <span className="nt">{post.frontmatter.title}</span>
        </Link>
      ))}
    </nav>
  );
}
