

export interface ICreateTransactionSellerDTO{
    payerId: string
    payeeId?: string
    sellerId?: string
    date?: Date
    amount: number
}