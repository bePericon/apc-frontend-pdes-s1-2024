export interface Role {
    _id: string
    name: string
    description: string
    permissions: [
        {
            _id: string
            name: string
            description: string
            creationDate: string
        },
    ]
    creationDate: string
}

export interface Favorite {
    _id: string
    user: string | User
    itemId: string
    comment: string
    rating: number
    creationDate: string
}

export interface User {
    _id: string
    name: string
    surname: string
    username: string
    email: string
    password: string
    roles: Role[]
    favorites: Favorite[]
    createdDate: string
}

export enum RoleName {
    PURCHASER = 'comprador',
    ADMIN = 'admin',
}
