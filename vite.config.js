import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    dotenv.config({ path: '.env.production' });
  }

  return {
    plugins: [react()],
  };
});
