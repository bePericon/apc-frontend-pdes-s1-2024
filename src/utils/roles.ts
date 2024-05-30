import { Role, RoleName } from '@/types/apc.types'

export const isPurchaser = (roles: Role[] = []) => {
    return roles.some((role) => role.name === RoleName.PURCHASER)
}
