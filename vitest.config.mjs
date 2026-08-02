import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@inwork/storage-engine': path.resolve(
        import.meta.dirname,
        'packages/storage-engine/src'
      )
    }
  },
  test: {
    globals: true,
  }
});
