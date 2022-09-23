import {AUTHORIZATION_KEY} from '../../setting'

export const getToken = (): string => {
    return localStorage.getItem(AUTHORIZATION_KEY) as string
}

export const removeToken = () => {
    localStorage.removeItem(AUTHORIZATION_KEY)
}

export const setToken = (token: string) => {
    localStorage.setItem(AUTHORIZATION_KEY, token)
}

