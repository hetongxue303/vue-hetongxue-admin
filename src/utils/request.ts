import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import {useRouter} from 'vue-router'
import * as nProgress from 'nprogress'
import {getToken} from './auth'
import {useUserStore} from "../store/modules/user";

axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    withCredentials: true
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

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

axios.interceptors.response.use(async (response: AxiosResponse) => {
    if (response.status !== 200) {
        switch (response.status as number) {
            case 401:
                ElMessage.warning('您未登录，请先登录！');
                const router = useRouter();
                await router.replace('/login');
                break
            case 403:
                ElMessage.warning('您无权访问，请联系管理员！');
                break
            // 50008:非法令牌    50012:其他客户端登录    50014:令牌过期
            case 50008 | 50012 | 50014:
                ElMessageBox.confirm('您已注销，您可以取消以停留在此页面，或再次登录', '确认注销', {
                    confirmButtonText: '再次登录',
                    cancelButtonText: '返回',
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
        ElNotification.error(error.message || '响应错误')
        return Promise.reject(error);
    }
))

export default axios