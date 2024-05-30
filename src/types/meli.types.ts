
export interface Product {
    title: string;
    thumbnail: string;
    thumbnail_id: string;
    pictures: any[]
    price: number
    itemId: string
    isFavorite?: boolean
    rating?: number
    favoriteId?: string
    comment?: string
}