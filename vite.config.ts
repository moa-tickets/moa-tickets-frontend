import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = env.VITE_API_BASE_URL || 'http://localhost:8080';

  return {
    plugins: [
      react(),
      tailwindcss(),
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    // React 중복 로드 방지를 위한 의존성 최적화
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux',
        'zustand',
        '@tanstack/react-query',
        'axios',
      ],
    },
    define: {
      global: 'window',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'ES2022',
      sourcemap: false,
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash:8].js',
          chunkFileNames: 'assets/[name]-[hash:8].js',
          assetFileNames: 'assets/[name]-[hash:8][extname]',
          manualChunks: (id: string) => {
            if (
              id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router-dom')
            ) {
              return 'react-vendor';
            }
            if (
              id.includes('node_modules/@reduxjs') ||
              id.includes('node_modules/react-redux')
            ) {
              return 'redux-vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 300,
    },
    server: {
      hmr: {
        host: 'localhost',
        port: 5173,
        protocol: 'ws',
      },
      fs: {
        cachedChecks: true,
        deny: ['.env', '.env.local', '.git', 'node_modules/.vite'],
      },
      middlewares: [
        (req: any, res: any, next: any) => {
          // WebSocket 업그레이드 요청은 스킵
          if (req.headers.upgrade === 'websocket') {
            return next();
          }

          // HMR 웹소켓 요청은 스킵
          if (
            req.url.includes('?token=') ||
            req.url === '/@vite/client' ||
            req.url.includes('/@react-refresh')
          ) {
            return next();
          }

          // assets: 1년 캐싱
          if (req.url.startsWith('/assets/')) {
            res.setHeader(
              'Cache-Control',
              'public, max-age=31536000, immutable',
            );
          }
          // HTML: 재검증
          else if (req.url.endsWith('.html') || req.url === '/') {
            res.setHeader(
              'Cache-Control',
              'public, max-age=0, must-revalidate',
            );
          }

          res.setHeader('ETag', 'false');
          res.setHeader('Last-Modified', 'false');
          next();
        },
      ],
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          ws: false,
        },
      },
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  } as any;
});
