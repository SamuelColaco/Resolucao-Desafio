import { ISellerRepository } from "../../../repositories/ISellerRepository";
import { AppError } from "../../../utils/AppError";
import { DeleteSellerDTO } from "./DeleteSellerDTO";

export class DeleteSeller{

    constructor(
        private sellerRepository: ISellerRepository
    ){}

    async execute({ id }: DeleteSellerDTO){

        const userExist = await this.sellerRepository.findSellerById(id)

        if(!userExist){
            throw new AppError("Usuário não encontrado", 404)
        }

        await this.sellerRepository.delete(id)
    }
}