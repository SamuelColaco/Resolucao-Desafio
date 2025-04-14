
import { randomUUID } from "node:crypto"
import { Transaction } from "./Transaction"

type SellerProps = {
    name: string
    email: string
    passwordHash: string
    CNPJ: string
    balance?: number

    Transaction?: Transaction[]
}

export class Seller{

    public readonly id: string

    public name: string
    public email: string
    public passwordHash: string
    public CNPJ: string

    public balance: number = 0

    public Transaction: Transaction[]

    constructor(data: SellerProps, id?: string){

        this.id = id ?? randomUUID()
        this.name = data.name
        this.email = data.email
        this.passwordHash = data.passwordHash
        this.CNPJ = data.CNPJ
        this.balance = data.balance ?? 0

        this.Transaction = data.Transaction ?? []
    }
}