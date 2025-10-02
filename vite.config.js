import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mi_app_copmedor/', // <--- agrega esto
  plugins: [react()],
});
