import axios from '../utils/request'
import * as qs from 'qs'
import md5 from "js-md5";

const api = import.meta.env.VITE_BASE_API + '/auth'

/**
 * 用户登录
 *
 * @param data 登录信息
 */
export const login = (data: any) => {
    return axios({
        method: 'POST',
        url: api + '/login',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 用户登出
 */
export const logout = () => {
    return axios({
        method: 'GET',
        url: api + '/logout'
    })
}

/**
 * 用户注册
 *
 * @param data 用户信息
 */
export const register = (data: any) => {
    return axios({
        method: 'POST',
        url: api + '/register',
        data: data
    })
}

/**
 * 获取验证码
 */
export const getCodeImg = () => {
    return axios({
        method: 'GET',
        url: api + '/captchaImage'
    })
}

/**
 *获取用户详细信息
 */
export const getInfo = () => {
    return axios({
        method: 'GET',
        url: api + '/getInfo'
    })
}