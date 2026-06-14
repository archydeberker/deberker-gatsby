import Footer from '@/components/footer';
import Header from '@/components/header';
import type { ReactNode } from 'react';

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site page">
      <div className="shell">
        <Header />
        <main className="page-main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
