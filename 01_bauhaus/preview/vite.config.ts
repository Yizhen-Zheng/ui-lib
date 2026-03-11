import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@atoms':      path.resolve(__dirname, '../atoms'),
      '@layout':     path.resolve(__dirname, '../layout'),
      '@composites': path.resolve(__dirname, '../composites'),
      '@tokens':     path.resolve(__dirname, '../tokens.css'),
    },
  },
})
