import PaginationNav from '@/components/pagination-nav';
import PostList from '@/components/post-list';
import { getAllPosts } from '@/lib/mdx';

const POSTS_PER_PAGE = 6;

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const posts = await getAllPosts();
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(resolvedSearchParams.page ?? '1', 10) || 1);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = startIndex + POSTS_PER_PAGE < posts.length;
  const previousHref = currentPage === 2 ? '/' : `/?page=${currentPage - 1}`;
  const nextHref = `/?page=${currentPage + 1}`;

  return (
    <div>
      <PostList posts={paginatedPosts} basePath="/blog" />
      <PaginationNav
        previousHref={hasPreviousPage ? previousHref : undefined}
        nextHref={hasNextPage ? nextHref : undefined}
      />
    </div>
  );
}
