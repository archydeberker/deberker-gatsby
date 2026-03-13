import PaginationNav from '@/components/pagination-nav';
import PostList from '@/components/post-list';
import { getAllPosts, getPostsForPage, getTotalPages, POSTS_PER_PAGE } from '@/lib/mdx';
import { notFound } from 'next/navigation';

interface HomeArchivePageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default async function HomeArchivePage({ params }: HomeArchivePageProps) {
  const { page } = await params;
  const currentPage = Number.parseInt(page, 10);
  const posts = await getAllPosts();
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);

  if (!Number.isFinite(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound();
  }

  const previousHref = currentPage === 2 ? '/' : `/page/${currentPage - 1}`;
  const nextHref = currentPage < totalPages ? `/page/${currentPage + 1}` : undefined;
  const paginatedPosts = getPostsForPage(posts, currentPage, POSTS_PER_PAGE);

  return (
    <div>
      <PostList posts={paginatedPosts} basePath="/blog" />
      <PaginationNav previousHref={previousHref} nextHref={nextHref} />
    </div>
  );
}
