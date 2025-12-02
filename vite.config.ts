import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite' // Добавляем type-only импорт

export default defineConfig({
  plugins: [react()],
  base: '/lab1-react-vite-gh-pages',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  }
} as UserConfig & { test: any })
