import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:
  {
    alias:{
      style: '/src/style',
      assets: '/src/assets',
      shared: '/src/shared',
      components: '/src/components',
      layouts: '/src/layouts',
      pages: '/src/pages',
      interface: '/src/interface',
      context: '/src/context',
      hooks: '/src/hooks',
      hocs: '/src/hocs',
      api: '/src/api',
      utils: '/src/utils',
      redux: '/src/redux',
      database: '/src/database',
    }
  }
})
