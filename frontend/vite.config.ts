import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em desenvolvimento, /api é encaminhado ao backend Flask (sem CORS no navegador)
const ALVO_API = process.env.VITE_API_PROXY ?? 'http://127.0.0.1:5000'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      '/api': { target: ALVO_API, changeOrigin: true },
    },
  },
})
