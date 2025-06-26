import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url))

const copyRedirectsPlugin = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      const src = path.resolve(__dirname, '_redirects')
      const dest = path.resolve(__dirname, 'dist/_redirects')
      fs.copyFileSync(src, dest)
    }
  }
}

export default defineConfig({
  plugins: [react(), copyRedirectsPlugin()]
})
