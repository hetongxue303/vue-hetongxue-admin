export interface IMenu {
    name: string
    path: string
    icon: string
    children?: Array<IMenu> | null
}

export interface IMeta {
    title: string
    icon?: string | null
    keepAlive?: boolean
    requireAuth?: boolean
    roles?: Array<string> | null
}

export interface IRouter {
    name: string
    path: string
    component: string
    meta: IMeta
    children?: Array<IRouter> | null
}