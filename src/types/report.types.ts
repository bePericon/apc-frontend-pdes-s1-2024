import { Favorite, User } from './apc.types'
import { HydratedProduct, PurchaseProduct } from './meli.types'

export interface FavoriteReportItem {
    _id: string // itemId
    items: Favorite[]
    count: number // items length
    averageRating: number
    hydrated: HydratedProduct // only data from Meli
}

export interface UserReportItem {
    user: User
    lastPurchase: PurchaseProduct
    count: number
}

export interface BestSellingReportItem {
    itemId: string
    hydrated: HydratedProduct
    count: number
}