import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server:{
    port:3000,
    allowedHosts: [
      '192.168.8.237:3000/', // Allows a specific IP address
      // 'f9c54ab27750.ngrok-free.app',
    ]
  },
  base: "/", // make sure routing works correctly
  build: {
    outDir: '../server/client/dist',   // <<--- output to server folder
    emptyOutDir: true
  }
})
