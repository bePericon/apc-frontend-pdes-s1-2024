import { HTTPService } from './http.service'

class FavoriteService extends HTTPService {
    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL_BASE as string)
    }

    public async getAll(): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/favorite`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async add(favorite: any): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.post(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/favorite`,
            favorite,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async delete(favoriteId: string): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.delete(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/favorite/delete/${favoriteId}`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async update(
        favoriteId: string,
        rating: number,
        comment: string
    ): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.put(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/favorite/update/${favoriteId}`,
            { rating, comment },
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async getFavoritesByUserId(id: string): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/favorite/user/${id}`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async getReportTopFive(): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/favorite/report/top-five`,
            {
                withCredentials: true,
            }
        )

        return data
    }
}

const instance = new FavoriteService()
export default instance
