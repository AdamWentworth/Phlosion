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
    'Phlosion is a branded hub for production-minded software projects, product experiments, demos, and changelogs by Adam Wentworth.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Phlosion | Software Product Lab',
    description:
      'A product studio for ambitious software experiments across AI assistants, full-stack systems, and games.',
    url: 'https://phlosion.com',
    siteName: 'Phlosion',
    images: [
      {
        url: '/phlosion-lockup.png',
        width: 1536,
        height: 587,
        alt: 'Phlosion',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phlosion | Software Product Lab',
    description:
      'A product studio for ambitious software experiments across AI assistants, full-stack systems, and games.',
    images: ['/phlosion-lockup.png'],
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
