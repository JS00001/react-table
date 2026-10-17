import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { 'table/index': 'src/table/index.ts', 'modal/index': 'src/modal/index.ts', 'sidebar/index': 'src/sidebar/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', /^motion(?:\/|$)/],
});
