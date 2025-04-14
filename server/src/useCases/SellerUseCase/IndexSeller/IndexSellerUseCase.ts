
import { Seller } from "../../../entities/Seller";
import { ISellerRepository } from "../../../repositories/ISellerRepository";

export class IndexSeller{
    constructor(
        private sellerRepository: ISellerRepository
    ){}

    async execute(): Promise<Seller[]>{
        return await this.sellerRepository.findAll()
    }
}