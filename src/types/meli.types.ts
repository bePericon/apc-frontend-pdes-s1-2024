export interface FavoriteProduct {
    user: string
    favoriteId: string
    rating?: number
    comment?: string
    createdDateFavorite: string
}

export interface Product extends FavoriteProduct {
    itemId: string
    hydrated: HydratedProduct
}

export interface PurchaseProduct extends Product {
    user: string
    purchaseId: string
    price: number
    quantity: number
    createdDatePurchase: string
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
