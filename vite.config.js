import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Ensure Render can detect the port
    host: true, // Allow external access
  },
  preview: {
    port: 3000, // Ensure preview mode works
    host: true,
  },
})