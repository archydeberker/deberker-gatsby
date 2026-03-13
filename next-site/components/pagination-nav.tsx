import Link from 'next/link';

interface PaginationNavProps {
  previousHref?: string;
  nextHref?: string;
}

export default function PaginationNav({ previousHref, nextHref }: PaginationNavProps) {
  return (
    <nav className="my-4 flex items-center justify-between">
      <div>
        {previousHref ? (
          <Link className="font-sans text-[0.95rem] text-primary no-underline transition-colors hover:text-coral" href={previousHref}>
            ← Previous page
          </Link>
        ) : null}
      </div>
      <div>
        {nextHref ? (
          <Link className="font-sans text-[0.95rem] text-primary no-underline transition-colors hover:text-coral" href={nextHref}>
            Next page →
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
