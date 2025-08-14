import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
  // base: '/', // default; keep it if you previously changed it
})
