import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'firebase/app', 'firebase/auth'],
  esbuildOptions(options) {
    options.conditions = ['module']
  }
})
