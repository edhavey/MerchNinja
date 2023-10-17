import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphqlPlugin from 'vite-plugin-graphql';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), graphqlPlugin],
});
