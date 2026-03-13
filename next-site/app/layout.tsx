import type { Metadata } from 'next';
import { Domine, Source_Sans_3 } from 'next/font/google';
import SiteShell from '@/components/site-shell';
import { rssPath, siteDescription, siteName, siteUrl } from '@/lib/site';
import './tailwind.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '600', '700', '800'],
});

const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  alternates: {
    types: {
      'application/rss+xml': rssPath,
    },
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${domine.variable} font-serif antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
