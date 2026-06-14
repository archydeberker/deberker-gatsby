import Hero from '@/components/hero';
import PaginationNav from '@/components/pagination-nav';
import PostList from '@/components/post-list';
import { getAllPosts, getPostsForPage, getTotalPages, POSTS_PER_PAGE } from '@/lib/mdx';

function yearRange(posts: { frontmatter: { date: string } }[]): string {
  if (!posts.length) return '';
  const years = posts.map((p) => new Date(p.frontmatter.date).getFullYear());
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min}` : `${min}—${max}`;
}

export default async function HomePage() {
  const posts = await getAllPosts();
  const paginatedPosts = getPostsForPage(posts, 1, POSTS_PER_PAGE);
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);
  const nextHref = totalPages > 1 ? '/page/2' : undefined;

  return (
    <div>
      <Hero />
      <PostList
        posts={paginatedPosts}
        basePath="/blog"
        total={posts.length}
        range={yearRange(posts)}
      />
      <PaginationNav nextHref={nextHref} />
    </div>
  );
}
