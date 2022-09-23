import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import WindiCSS from 'vite-plugin-windicss'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        createSvgIconsPlugin({
            // svg图标存放路径
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@layout': path.resolve(__dirname, 'src/layout'),
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        cors: true,
        open: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
})