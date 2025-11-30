import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/beehiiv': {
            target: 'https://api.beehiiv.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/beehiiv/, ''),
            configure: (proxy, _options) => {
              proxy.on('proxyReq', (proxyReq, _req, _res) => {
                // Add API key to the request headers
                const apiKey = env.BEEHIIV_API_KEY;
                if (apiKey) {
                  proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
                }
              });
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.BEEHIIV_API_KEY': JSON.stringify(env.BEEHIIV_API_KEY),
        'process.env.BEEHIIV_PUBLICATION_ID': JSON.stringify(env.BEEHIIV_PUBLICATION_ID)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
