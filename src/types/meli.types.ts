import { User } from './apc.types'

export interface FavoriteProduct {
    favoriteId?: string
    rating?: number
    comment?: string
    isFavorite?: boolean
}

export interface Product extends FavoriteProduct {
    title: string
    thumbnail: string
    thumbnail_id: string
    pictures: any[]
    price: number
    itemId: string

    userId?: string
    createdDate?: string
    hydrated?: HydratedProduct
}

export interface PurchaseProduct extends Product {
    purchaseId: string
    price: number
    quantity: number
}

export interface HydratedProduct {
    itemId: string
    title: string
    thumbnail: string
    thumbnail_id: string
    pictures: Picture[]
    price: number
}

export interface Picture {
    quality: string
    id: string
    url: string
    secure_url: string
    size: string
    max_size: string
}
