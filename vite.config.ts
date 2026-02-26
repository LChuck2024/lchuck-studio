import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
        watch: {
          usePolling: true, // 强制轮询，解决文件监听失效问题
          interval: 100,
        },
        hmr: {
          // 明确 HMR 连接配置，防止 WebSocket 连接失败
          host: '127.0.0.1',
          clientPort: 3000,
        }
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
});
