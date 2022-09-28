/// <reference types="vite/client" />

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'nprogress'
declare module 'qs'
declare module 'js-md5'
declare module 'jsencrypt/bin/jsencrypt.min'