import { HTTPService } from './http.service'

class PurchaseService extends HTTPService {
    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL_BASE as string)
    }

    public async add(purchase: any): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.post(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/purchase`,
            purchase,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async delete(purchaseId: string): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.delete(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/purchase/delete/${purchaseId}`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async update(
        purchaseId: string,
        quantity: number,
        price: number
    ): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.put(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/purchase/update/${purchaseId}`,
            { quantity, price },
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async getPurchasesByUserId(id: string): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/purchase/user/${id}`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async getAll(): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/purchase`,
            {
                withCredentials: true,
            }
        )

        return data
    }

    public async getReportTopFiveBestSelling(): Promise<{ data: any; error: any }> {
        const { data } = await this.instance.get(
            `${process.env.NEXT_PUBLIC_API_URL_BASE}/purchase/report/top-five-best-selling-purchases`,
            {
                withCredentials: true,
            }
        )

        return data
    }
}

const instance = new PurchaseService()
export default instance
