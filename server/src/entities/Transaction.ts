
import { randomUUID } from "node:crypto"
import { NormalUser } from "./NormalUser"
import { Seller } from "./Seller"

type TransactionProps = {
    payerId: string
    payeeId?: string
    sellerId?: string
    date?: Date
    amount: number

    User: NormalUser
    ReceivedUser?: NormalUser
    Seller?: Seller
}

export class Transaction{

    public readonly id: string

    public payerId: string
    public payeeId?: string
    public sellerId?: string
    public date?: Date
    public amount: number

    public User: NormalUser
    public ReceivedUser?: NormalUser

    public Seller?: Seller

    constructor(data: TransactionProps, id?: string){

        this.id = id ?? randomUUID()
        this.payerId = data.payerId
        this.payeeId = data.payeeId
        this.sellerId = data.sellerId
        this.date = data.date ?? new Date()
        this.amount = data.amount

        this.User = data.User
        this.ReceivedUser = data.ReceivedUser
        this.Seller = data.Seller
    }
    
}