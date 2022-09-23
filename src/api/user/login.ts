import axios from '../../utils/request'
import * as qs from 'qs'

const baseAPI = import.meta.env.VITE_BASE_API

export const userLogin = (data: any) => {
    return axios({
        method: 'POST',
        url: baseAPI + '/auth/login',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const userLogout = () => {
    return axios({
        method: 'GET',
        url: baseAPI + '/auth/logout'
    })
}

export const userGetCode = () => {
    return axios({
        method: 'GET',
        url: baseAPI + '/auth/getCode'
    })
}