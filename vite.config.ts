import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env.THIRDWEB_CLIENT_ID': JSON.stringify(process.env.VITE_THIRDWEB_CLIENT_ID)
  }
});