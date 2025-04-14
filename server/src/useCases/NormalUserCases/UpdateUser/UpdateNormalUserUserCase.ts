
import { IHashGenerator } from "../../../interfaces/IHashGenerator"
import { IUsersRepository } from "../../../repositories/INormalUsersRepository"
import { AppError } from "../../../utils/AppError";
import { IUpdateNormalUserRequestDTO } from "./UpdateNormalUserDTO";

export class UpdateNormalUser{
    constructor(
        private NormalUserRepository: IUsersRepository,
        private CreateBcryptHash: IHashGenerator
    ){}

    async execute({id, name, email, password, CPF}: IUpdateNormalUserRequestDTO){

        const userExist = await this.NormalUserRepository.findById(id)

        if(!userExist){
            throw new AppError("Usuário não cadastrado", 404)
        }

        if(name){
            userExist.name = name
        }
        
        if(email){
            userExist.email = email
        }

        if(password){
            userExist.passwordHash  = await this.CreateBcryptHash.hash(password)
        }

        if(CPF){
            userExist.CPF = CPF
        }

        await this.NormalUserRepository.update(userExist)
    }
}