import { HTTPService } from './http.service'

class UserService extends HTTPService {
    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL_BASE as string)
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
}

const instance = new UserService()
export default instance
