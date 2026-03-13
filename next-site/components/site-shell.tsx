'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isHomeHeader = pathname === '/' || pathname === '/blog';

  return (
    <div className="relative min-h-screen p-1 text-text">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-coral" />
        <div className="absolute -inset-[18%] animate-shell-gradient bg-shell-gradient bg-[length:160%_160%] motion-reduce:animate-none" />
      </div>
      <div className="relative min-h-[calc(100vh-50px)] rounded-xl bg-white">
        <div className="mx-auto max-w-3xl px-5 py-5">
          <header className={isHomeHeader ? 'mb-12' : 'mb-0'}>
            <Header />
          </header>
          <main className={isHomeHeader ? '' : 'pt-36'}>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
