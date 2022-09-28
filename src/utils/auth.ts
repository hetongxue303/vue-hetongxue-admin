import {AUTHORIZATION_KEY} from '../../setting'
import {useCookies} from '@vueuse/integrations/useCookies'

const cookies = useCookies()

export const getToken = (): string => {
    return cookies.get(AUTHORIZATION_KEY) as string
}

export const removeToken = () => {
    cookies.remove(AUTHORIZATION_KEY)
}

export const setToken = (token: string) => {
    cookies.set(AUTHORIZATION_KEY, token)
}