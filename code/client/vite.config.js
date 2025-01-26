import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    // exposer le port 5173 pour docker
    server: {
      host: true,
      port: 5173,
    },
})
