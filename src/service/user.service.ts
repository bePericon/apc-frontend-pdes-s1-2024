import { HTTPService } from './http.service'

class UserService extends HTTPService {
    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL_BASE as string)
    }

    public async getById(id: string): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/user/${id}`,
            {
                withCredentials: true,
            }
        )

        return data
    } 

    public async getAll(): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/user`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async update(id: string, body: any): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.put(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/user/update/${id}`,
            body,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async getReportTopFiveMustPurchases(): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/user/report/top-five-must-purchases`,
            {
                withCredentials: true,
            }
        )

        return data
    }
}

const instance = new UserService()
export default instance
