
import { NormalUser } from "../entities/NormalUser"
import { Seller } from "../entities/Seller"
import { Transaction } from "../entities/Transaction"

export interface ITransactionRepository{
    findPayeeById(payeeId: string): Promise<NormalUser | null>
    findPayerById(payerId: string): Promise<NormalUser | null>
    findSellerById(sellerId: string): Promise<Seller | null>
    saveSellerTransfer(transfer: Transaction): Promise<void>
    save(transfer: Transaction): Promise<void>
}