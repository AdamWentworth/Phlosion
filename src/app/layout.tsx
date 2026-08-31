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
    'Phlosion is a software product lab for full-stack services, local AI systems, desktop tools, web surfaces, and C++ game/runtime work.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Phlosion | Software Product Lab',
    description:
      'Software product lab work across full-stack services, local AI systems, desktop tools, web surfaces, and games.',
    url: 'https://phlosion.com',
    siteName: 'Phlosion',
    images: [
      {
        url: '/brand/phlosion-social-card.png',
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
      'Software product lab work across full-stack services, local AI systems, desktop tools, web surfaces, and games.',
    images: ['/brand/phlosion-social-card.png'],
  },
  icons: {
    icon: [{ url: '/brand/phlosion-mark.png', type: 'image/png' }],
    shortcut: '/brand/phlosion-mark.png',
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
