import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        sourcemap: true,
        globPatterns: ['src/assets/svg/*.svg']
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000'
      }
    }
  }
})
