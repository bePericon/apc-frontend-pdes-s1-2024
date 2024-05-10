

export interface Product {
    _id: string;
    title: string;
    thumbnail: string;
    thumbnail_id: string;
    pictures: any[]
    price: number
    isFavorite?: {
        _id: string
        rating: number
    }
}