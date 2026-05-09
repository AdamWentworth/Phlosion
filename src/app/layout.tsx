import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://phlosion.com'),
  title: {
    default: 'Phlosion | Software Product Lab',
    template: '%s | Phlosion',
  },
  description:
    'Phlosion is a software product lab for recruiter-facing case studies across full-stack services, local AI systems, desktop tools, websites, and C++ game/runtime work.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Phlosion | Software Product Lab',
    description:
      'Product-minded engineering case studies across full-stack services, local AI systems, desktop tools, websites, and games.',
    url: 'https://phlosion.com',
    siteName: 'Phlosion',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Phlosion software product lab',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phlosion | Software Product Lab',
    description:
      'Product-minded engineering case studies across full-stack services, local AI systems, desktop tools, websites, and games.',
    images: ['/social-card.png'],
  },
  icons: {
    icon: [{ url: '/phlosion-mark.png', type: 'image/png' }],
    shortcut: '/phlosion-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
