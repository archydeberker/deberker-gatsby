import Link from 'next/link';

interface PaginationNavProps {
  previousHref?: string;
  nextHref?: string;
}

export default function PaginationNav({ previousHref, nextHref }: PaginationNavProps) {
  if (!previousHref && !nextHref) {
    return null;
  }

  return (
    <nav className="A-pager">
      <div>
        {previousHref ? <Link href={previousHref}>← Newer</Link> : null}
      </div>
      <div>
        {nextHref ? <Link href={nextHref}>Older →</Link> : null}
      </div>
    </nav>
  );
}
