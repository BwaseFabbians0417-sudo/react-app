import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Netlify serves the site from the domain root; GitHub Pages serves it from /react-app/
  base: process.env.NETLIFY ? '/' : '/react-app/',
  plugins: [react()],
})
