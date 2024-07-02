import { HTTPService } from './http.service'

class MeliService extends HTTPService {
    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL_BASE as string)
    }

    public async search(
        value: string | string[] | undefined,
        offset: number,
        limit: number,
        filters: any
    ): Promise<{ data: any; error: any }> {
        let obj: any = {}
        for (const key in filters) {
            if (filters[key] !== undefined) obj[key] = filters[key]
        }
        console.log("🚀 ~ MeliService ~ obj:", obj)

        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/meli/search`,
            {
                params: {
                    q: value,
                    offset: offset,
                    limit: limit,
                    ...obj,
                },
                withCredentials: true,
            }
        )

        return data
    }

    public async searchByItemId(value: string): Promise<{ data: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/meli/item/${value}`,
            { withCredentials: true }
        )

        return data
    }
}

const instance = new MeliService()
export default instance
