import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import {useRouter} from 'vue-router'
import * as nProgress from 'nprogress'
import {getToken} from './auth'
import {useUserStore} from "../store/modules/user";

axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    withCredentials: true,
    timeoutErrorMessage: '请求超时',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    nProgress.start()
    // 让每个请求携带自定义token
    if (getToken() && config.headers) {
        config.headers.Authorization = getToken()
    }
    return config;
}, ((error: any) => {
    ElNotification.error('请求错误！')
    return Promise.reject(error);
}))

enum responseMsg {
    '您未登录，请先登录！' = 401,
    '您无权访问，请联系管理员！' = 403,
    '服务器异常' = 500
}

axios.interceptors.response.use(async (response: AxiosResponse) => {
    if (response.status !== 200 || response.data.code !== 200) {
        switch (response.status as number) {
            case 401:
                ElMessage.warning(responseMsg[response.status] || '未知错误');
                const router = useRouter();
                await router.replace('/login');
                break
            case 403:
                ElMessage.warning(responseMsg[response.status] || '未知错误');
                break
            // 50008:非法令牌    50012:其他客户端登录    50014:令牌过期
            case 50008 | 50012 | 50014:
                ElMessageBox.confirm('您的登录信息已失效，请您再次登录!', '登陆失效', {
                    confirmButtonText: '返回登录',
                    cancelButtonText: '注销',
                    type: 'warning'
                }).then(() => {
                    const userStore = useUserStore()
                    userStore.userLogout()
                    location.reload()
                })
                break
            default:
                ElMessage.error(response.data.message || '未知错误');
        }
    }
    nProgress.done()
    return response;
}, ((error: any) => {
        ElNotification.error(responseMsg[error.response.status] || '未知错误')
        return Promise.reject(error);
    }
))

export default axios