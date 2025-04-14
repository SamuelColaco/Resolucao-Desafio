import { Seller } from "../../../entities/Seller";
import { IHashGenerator } from "../../../interfaces/IHashGenerator";
import { ISellerRepository } from "../../../repositories/ISellerRepository";
import { AppError } from "../../../utils/AppError";
import { ICreateSellerDTO } from "./CreateSellerDTO";

export class CreateSeller{
    constructor(
        private sellerRepository: ISellerRepository,
        private createBcryptHash: IHashGenerator
    ){}

    async execute({ name, email, password, CNPJ, balance }: ICreateSellerDTO){

        const userExist = await this.sellerRepository.findSellerByEmail(email)

        if(userExist){ 
            throw new AppError("Usuário com mesmo email já cadastrado")
        }

        const userCnpjExist = await this.sellerRepository.findSellerByCnpj(CNPJ)
        
        if(userCnpjExist){
            throw new AppError("Usuário com CNPJ já cadastrado")
        }

        const passwordHash = await this.createBcryptHash.hash(password)

        const seller = new Seller({
            name,
            email,
            passwordHash,
            CNPJ
        })

        await this.sellerRepository.save(seller)
    }
}