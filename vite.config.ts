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
      {
        name: 'image-cache-headers',
        configureServer(server: import('vite').ViteDevServer) {
          server.middlewares.use((req: any, res: any, next: any) => {
            if (
              req.url &&
              /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i.test(
                req.url.split('?')[0],
              )
            ) {
              res.setHeader(
                'Cache-Control',
                'public, max-age=31536000, immutable',
              );
            }
            next();
          });
        },
      },
    ],
    // React 중복 로드 방지를 위한 의존성 최적화
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-router-dom',
        'react-router',
      ],
      entries: ['src/**/*.tsx', 'src/**/*.ts'],
    },
    define: {
      global: 'window',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    build: {
      target: 'es2020',
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
        overlay: true,
      },
      fs: {
        cachedChecks: true,
        deny: ['.env', '.env.local', '.git'],
      },
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          ws: false,
        },
        '/newApi': {
          target: 'http://172.16.24.179:8080/',
          changeOrigin: true,
          ws: false,
          rewrite: (path: string) => path.replace(/^\/newApi/, '/api'),
        },
      },
    },
  } as any;
});
