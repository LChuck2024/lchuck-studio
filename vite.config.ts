import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载 .env 与系统环境变量，确保本地和 EdgeOne 构建时都能读取
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.VITE_DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '';

  return {
      // 显式注入 API Key，解决 EdgeOne 等平台构建时 env 未正确传递的问题
      define: {
        'import.meta.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(apiKey),
      },
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
  };
});
