import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MUMBLE/', // Added for GitHub Pages deployment
  plugins: [react()],
})
