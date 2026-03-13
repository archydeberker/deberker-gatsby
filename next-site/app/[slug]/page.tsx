import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { notFound, permanentRedirect } from 'next/navigation';

interface LegacyPostRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function LegacyPostRedirectPage({
  params,
}: LegacyPostRedirectPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  permanentRedirect(`/blog/${post.slug}`);
}
