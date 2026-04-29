import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // Diubah menjadi '/' agar bekerja dengan root domain di Vercel
    base: '/', 
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // Memastikan alias '@' mengarah ke folder root
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR tetap aktif kecuali jika ada instruksi lingkungan khusus
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
