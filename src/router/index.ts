import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/Index.vue'
import NProgress from "../plugins/nProgress";
import {getToken} from "../utils/auth";

const routes: Array<RouteRecordRaw> = [
    {
        name: 'Login',
        path: '/login',
        meta: {
            title: '用户登录',
            isShow: false,
            requireAuth: false
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/redirect',
        component: Layout,
        redirect: 'noRedirect',
        meta: {
            isShow: false,
        },
        children: [
            {
                name: 'NotFound',
                path: '/:pathMatch(.*)*',
                component: () => import('../views/error/404.vue'),
                meta: {
                    title: '页面没有找到',
                    isShow: false,
                    requireAuth: true
                }
            },
            {
                name: 'NoAuth',
                path: '/401',
                component: () => import('../views/error/401.vue'),
                meta: {
                    title: '权限不足',
                    isShow: false,
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            isShow: false,
        },
        children: [
            {
                name: 'Dashboard',
                path: 'dashboard',
                component: () => import('../views/dashboard/Index.vue'),
                meta: {
                    title: '首页',
                    icon: null,
                    roles: ['any'],
                    isShow: true,
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: 'noRedirect',
        meta: {
            isShow: false,
        },
        children: [
            {
                name: 'User',
                path: '/system/user',
                component: () => import('../views/system/User.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'user',
                    roles: ['user:list', 'user:insert', 'user:delete', 'user:update'],
                    isShow: true,
                    requireAuth: true
                }
            },
            {
                name: 'Role',
                path: '/system/role',
                component: () => import('../views/system/Role.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'user',
                    roles: ['role:list', 'role:insert', 'role:delete', 'role:update'],
                    isShow: true,
                    requireAuth: true
                }
            },
            {
                name: 'Menu',
                path: '/system/menu',
                component: () => import('../views/system/Menu.vue'),
                meta: {
                    title: '菜单管理',
                    icon: 'user',
                    roles: ['menu:list', 'menu:insert', 'menu:delete', 'menu:update'],
                    isShow: true,
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

export default router