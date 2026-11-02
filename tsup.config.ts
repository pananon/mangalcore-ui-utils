import { defineConfig, type Options } from 'tsup';

const shared: Options = {
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom'],
  sourcemap: true,
  minify: true,
};

export default defineConfig([
  // Main entry: bundling strips per-file 'use client' directives, so add one to the output.
  // No `treeshake` option here: tsup's extra rollup pass strips the banner again (esbuild
  // still tree-shakes). Without the directive, Next.js Server Components can't import this.
  {
    ...shared,
    entry: ['src/index.ts'],
    clean: true,
    banner: { js: "'use client';" },
  },
  // Server-safe entry, no directive
  {
    ...shared,
    entry: ['src/server.ts'],
  },
]);
