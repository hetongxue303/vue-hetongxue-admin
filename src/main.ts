import {createApp} from 'vue'
import App from './App.vue'

import router from './router'
import {createPinia} from 'pinia'
import ElementPlus from './plugins/element-plus'
import i18n from './i18n'

import 'virtual:svg-icons-register'
import svgIcon from '@components/svgIcon/index.vue'

import './assets/stytle/index.scss'
import 'virtual:windi.css'

const app = createApp(App)

app.use(router)
    .use(ElementPlus)
    .use(createPinia())
    .use(i18n)
    .component('svg-icon', svgIcon)
    .mount('#app')