import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Serve the `examples/` directory as the dev root. Inside examples, imports
// of `rep-ass-js` are aliased to the TypeScript source so the demo always
// reflects the latest src/ without a build step.
//
// `base` is set to '/rep-ass-js/' for production builds so asset URLs resolve
// correctly when deployed as a GitHub Pages project site
// (https://contextnews.github.io/rep-ass-js/). Dev server runs at root.
export default defineConfig(({ command }) => ({
  root: 'examples',
  base: command === 'build' ? '/rep-ass-js/' : '/',
  resolve: {
    alias: {
      'rep-ass-js': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    port: 5180,
    host: '127.0.0.1',
  },
  build: {
    // Emit the built site into a top-level `examples-dist/` so the GH Pages
    // workflow has a stable path to upload, separate from the library
    // build output (`dist/`).
    outDir: resolve(__dirname, 'examples-dist'),
    emptyOutDir: true,
  },
}))
