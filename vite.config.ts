import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Aumentar límite a 1MB para evitar warnings en Vercel
    chunkSizeWarningLimit: 1000, // Aumentar límite a 1MB para evitar warnings en Vercel
  },
},
  server: {
  port: 3000
}
});