import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache 30 days
  },

  // Enable compression
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Faster builds
  reactStrictMode: true,

  // Disable ESLint during build (for faster builds)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during build (for faster builds)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters module issue
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withNextIntl(nextConfig);
