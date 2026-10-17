import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': decodeURIComponent(new URL('../src', import.meta.url).pathname),
    },
  },
});
