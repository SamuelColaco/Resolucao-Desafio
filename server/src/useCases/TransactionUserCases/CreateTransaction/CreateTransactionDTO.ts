
export interface ICreateTransactionDTO{
    payerId: string
    payeeId?: string
    sellerId?: string
    date?: Date
    amount: number
}