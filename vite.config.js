import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const IS_DEVEL = process.env.MODE === 'development'
const PORT = process.env.API_PORT || 4000

export default defineConfig({
  define: {
    API_BASE_URL: IS_DEVEL
      ? JSON.stringify(`http://localhost:${PORT}/api`)
      : JSON.stringify('http://www.somehost.com/api')
  },
  plugins: [
    vue(),
    VitePWA({
      mode: process.env.MODE || 'development',
      base: '/',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'PlayTime',
        short_name: 'PlayTime',
        theme_color: '#1f2937',
        background_color: '#1f2937',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
