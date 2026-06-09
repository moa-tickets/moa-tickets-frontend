import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [],
  },

  // Turbopack is the default bundler for `next dev` in v15+
  turbopack: {},

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
}

export default withBundleAnalyzer(nextConfig)
