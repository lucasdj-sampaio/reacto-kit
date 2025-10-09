import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      // plugin default options
    }),
  ],
  build: {
    lib: {
      // compute dirname for ESM-compatible builds
      entry: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/index.tsx'
      ),
      name: 'DatePicker',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: [
      'packages/date-picker/src/**/*.test.*',
      'packages/date-picker/src/**/__tests__/*.*',
      'packages/date-picker/src/**/__tests__/**/*.test.*',
    ],
    exclude: [
      '**/.storybook/**',
      'packages/date-picker/src/stories/**',
      '**/node_modules/**',
      '.storybook/**',
    ],
    globals: true,
  },
});
