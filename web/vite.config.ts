import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:4000',
      '/vote': 'http://localhost:4000',
      '/admin': 'http://localhost:4000'
    }
  },
  optimizeDeps: {
    include: ['@tanstack/query-core']
  }
})
