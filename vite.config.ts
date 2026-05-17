import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Serve the `examples/` directory as the dev root. Inside examples, imports
// of `rep-ass-js` are aliased to the TypeScript source so the demo always
// reflects the latest src/ without a build step.
export default defineConfig({
  root: 'examples',
  resolve: {
    alias: {
      'rep-ass-js': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    port: 5180,
    host: '127.0.0.1',
  },
})
