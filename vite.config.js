import { defineConfig } from 'vite'

// The Bell concept is one finished HTML page plus its photos.
// Everything lives in public/ and is copied to dist/ untouched.
export default defineConfig({
  build: { outDir: 'dist', emptyOutDir: true },
  publicDir: 'public',
})
