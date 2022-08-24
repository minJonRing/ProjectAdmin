import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    // "@babel/plugin-proposal-optional-chaining",
    // "@babel/plugin-proposal-nullish-coalescing-operator",
  ],

})
