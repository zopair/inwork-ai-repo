import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./apps/api-server/src', import.meta.url))
    },
    extensions: ['.ts', '.js', '.json']
  },
  test: {
    environment: 'node',
    globals: true,
  }
});
