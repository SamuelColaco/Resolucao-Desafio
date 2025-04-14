import { nativeEnum } from "zod";
import { ISellerRepository } from "../../../repositories/ISellerRepository";
import { AppError } from "../../../utils/AppError";
import { UpdateSellerDTO } from "./UpdateSellerDTO";
import { IHashGenerator } from "../../../interfaces/IHashGenerator";

export class UpdateSeller{

    constructor(
        private sellerRepository: ISellerRepository,
        private createBcryptHash: IHashGenerator
    ){}

    async execute({ id, name, email, password, CNPJ}: UpdateSellerDTO){

        const userExist = await this.sellerRepository.findSellerById(id)

        if(!userExist){
            throw new AppError("Usuário não existe", 404)
        }

        if(name){
            userExist.name = name
        }

        if(email){
            userExist.email = email
        }

        if(password){
            userExist.passwordHash =  await this.createBcryptHash.hash(password)
        }

        if(CNPJ){
            userExist.CNPJ = CNPJ
        }

        await this.sellerRepository.update(userExist)
    }
}