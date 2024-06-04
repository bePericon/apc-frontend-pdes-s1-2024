import { User } from './apc.types'

export interface FavoriteItem {
    _id: string
    user: User
    itemId: string
    comment: string
    rating: number
}

export interface FavoriteHydratedReport  {
    title: string;
    thumbnail: string;
    thumbnail_id: string;
    pictures: any[]
    price: number
}

export interface FavoriteReportItem {
    _id: string // itemId
    items: FavoriteItem[]
    count: number // items length
    averageRating: number
    hydrated: FavoriteHydratedReport // only data from Meli
}
