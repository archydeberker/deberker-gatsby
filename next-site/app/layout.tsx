import type { Metadata } from 'next';
import { Hanken_Grotesk, JetBrains_Mono, Newsreader } from 'next/font/google';
import Analytics from '@/components/analytics';
import SiteShell from '@/components/site-shell';
import { rssPath, siteDescription, siteName, siteUrl } from '@/lib/site';
import './tailwind.css';
import './redesign.css';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '500'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
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
    <html
      lang="en"
      className={`${hanken.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
