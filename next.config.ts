import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // 외부 이미지 도메인 허용 시 아래 형식으로 추가
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
  },

  // 실험적 기능 (Next.js 15)
  experimental: {
    // Turbopack 설정 (Next.js 15에서는 experimental 하위, v16+에서는 최상위 turbopack 키로 이동)
    // turbopack: {},

    // React 19 Server Actions 최적화
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
