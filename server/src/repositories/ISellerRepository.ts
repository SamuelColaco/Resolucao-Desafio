
import { Seller } from "../entities/Seller";

export interface ISellerRepository{
    findSellerByEmail(email: string): Promise<Seller| null>
    findSellerByCnpj(CNPJ: string): Promise<Seller | null>
    findAll(): Promise<Seller[]>
    findSellerById(id: string): Promise<Seller | null>
    update(seller: Seller): Promise<void>
    delete(id: string): Promise<void>
    save(seller: Seller): Promise<void>
}