import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@kinetix/ui-components': path.resolve(__dirname, '../../packages/ui-components/src'),
      '@kinetix/shared-types': path.resolve(__dirname, '../../packages/shared-types/src'),
      '@kinetix/business-logic': path.resolve(__dirname, '../../packages/business-logic/src'),
      '@kinetix/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
  // Configure public directory
  publicDir: 'public',
  // Configure base URL
  base: '/',
})
