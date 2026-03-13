import PaginationNav from '@/components/pagination-nav';
import PostList from '@/components/post-list';
import { getAllPosts, getPostsForPage, getTotalPages, POSTS_PER_PAGE } from '@/lib/mdx';

export const metadata = {
  title: 'Blog',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const paginatedPosts = getPostsForPage(posts, 1, POSTS_PER_PAGE);
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);
  const nextHref = totalPages > 1 ? '/blog/page/2' : undefined;

  return (
    <div>
      <PostList posts={paginatedPosts} basePath="/blog" />
      <PaginationNav nextHref={nextHref} />
    </div>
  );
}
