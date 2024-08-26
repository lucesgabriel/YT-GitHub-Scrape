import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify('327106431735-e8ejut59in4suotd9l8gg3jneci3qcuq.apps.googleusercontent.com'),
      'import.meta.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/oauth2callback': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/oauth2callback/, ''),
        },
      },
    },
  }
})