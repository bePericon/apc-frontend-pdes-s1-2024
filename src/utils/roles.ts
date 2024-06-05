import { Role, RoleName } from '@/types/apc.types'

const EnabledRoutes: any = {
    [RoleName.PURCHASER]: ['/apc', '/apc/favoritos'],
    [RoleName.ADMIN]: [
        '/apc/admin/reportes',
        '/apc/admin/usuarios',
        'apc/admin/favoritos',
    ],
}

export const isPurchaser = (roles: Role[] = []) => {
    return roles.some((role) => role.name === RoleName.PURCHASER)
}

export const isEnabledRoute = (roles: Role[], route: string) => {
    return roles.some((role) => EnabledRoutes[role.name].includes(route))
}

export const isAdmin = (roles: Role[] = []) => {
    return roles.some((role) => role.name === RoleName.ADMIN)
}
