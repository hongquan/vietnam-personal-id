import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fluentPlugin from 'rollup-plugin-fluent-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), fluentPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
})
