import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Allow tunneled hosts (e.g. ngrok) to reach the preview/dev server.
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
  server: {
    allowedHosts: true,
  },
})
