import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: './Game',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './Game'),
    },
  },
  // 配置服务器行为
  server: {
    // 如果需要代理 API 请求，请取消注释并配置
    proxy: {
      '/api': 'http://localhost:3001'
    },
    // 如果有 CORS 问题，可以尝试启用 CORS
    cors: true,
    // 配置静态文件服务的文件夹，默认是 'public'
    static: {
      strict: false,
    }
  },
  // 插件配置（如有需要）
  plugins: [
    // ...您的 Vite 插件
  ],
  // 配置模块化
  build: {
    rollupOptions: {
      external: ['pixi.js'],
    }
  }
});
