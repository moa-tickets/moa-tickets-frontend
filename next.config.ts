import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Add allowed remote image domains/patterns as needed
    remotePatterns: [],
  },

  // Turbopack is the default bundler for `next dev` in v15+
  // Use turbopack key (not experimental.turbopack) for v16+
  turbopack: {},

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers, redirects, and rewrites can be configured here
  // async headers() {
  //   return []
  // },
  // async redirects() {
  //   return []
  // },
  // async rewrites() {
  //   return []
  // },
}

export default nextConfig
