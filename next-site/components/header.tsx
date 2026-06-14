'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SITE_TITLE = 'Archy de Berker';

export default function Header() {
  const pathname = usePathname();
  const isAbout = pathname?.startsWith('/about') ?? false;
  const isWriting = !isAbout;

  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Home">
        <span className="brand-full">{SITE_TITLE}</span>
        <span className="brand-mono">AdeB</span>
      </Link>
      <nav className="nav">
        <Link href="/" className={isWriting ? 'active' : ''}>
          Writing
        </Link>
        <Link href="/about" className={isAbout ? 'active' : ''}>
          About
        </Link>
      </nav>
    </header>
  );
}
