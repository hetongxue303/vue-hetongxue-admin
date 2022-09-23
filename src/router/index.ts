import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import NProgress from '../plugins/nProgress'
import {getToken} from '../utils/auth'

const routes: Array<RouteRecordRaw> = [
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)*',
        component: () => import('../views/error/404.vue')
    },
    {
        name: 'noAuth',
        path: '/401',
        component: () => import('../views/error/401.vue')
    },
    {
        name: 'Login',
        path: '/login',
        meta: {
            title: '用户登录',
            hidden: true,
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        component: () => import('../layout/Index.vue'),
        redirect: '/dashboard',
        children: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: () => import('../views/dashboard/Index.vue'),
                meta: {
                    title: '首页',
                    hidden: true,
                    keepAlive: true,
                    requireAuth: true
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let LOGIN_PATH: string = '/login'
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {// 已登陆
        if (to.path === LOGIN_PATH) { // 如果访问登陆路由 则返回首页
            next('/')
        } else {
            next()
        }
    } else {// 未登录
        if (to.meta.requireAuth) {// 如果该页面需要权限 跳转登录
            next(LOGIN_PATH)
        } else {
            next()
        }
    }
})

router.afterEach((to, from, failure) => {
    NProgress.done()
})

export default router