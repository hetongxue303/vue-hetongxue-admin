import NProgress from '../plugins/nProgress'
import {getToken} from '../utils/auth'
import router from './index'

let LOGIN_PATH: string = '/login'

router.beforeEach(async (to, from, next) => {
    NProgress.start()

    // 设置页面标题
    document.title = to.meta.title as string

    // 是否已经登录
    if (getToken()) {
        // 如果访问登陆路由 则返回首页
        if (to.path === LOGIN_PATH) {
            next({path: '/'})
            NProgress.done()
        } else {
            next()
        }
    } else {
        // 如果该页面需要权限 跳转登录
        if (to.meta.requireAuth) {
            next({path: LOGIN_PATH})
        } else {
            next()
        }
        NProgress.done()
    }
})

router.afterEach(async (to, from, failure) => {
    NProgress.done()
})