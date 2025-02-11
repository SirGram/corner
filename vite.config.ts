import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx({
    rehypePlugins: [rehypeHighlight]
  })],
   optimizeDeps: {
    include: ['react-country-flag']
  }
});
