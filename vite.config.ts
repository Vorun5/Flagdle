import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react(), eslint()],
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            hooks: '/src/hooks',
            styles: '/src/styles',
            assets: '/src/assets',
            widgets: '/src/widgets',
            pages: '/src/pages',
        },
    },
})
