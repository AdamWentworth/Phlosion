import type { NextConfig } from 'next';
import { nexusMediaRevision } from './src/lib/nexusMediaRevision';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      { pathname: '/**', search: '' },
      {
        pathname: '/products/pokemon-go-nexus/demo/migration-preview/**',
        search: `?v=${nexusMediaRevision}`,
      },
    ],
  },
};

export default nextConfig;
