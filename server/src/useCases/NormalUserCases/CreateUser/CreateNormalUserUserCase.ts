
import { NormalUser } from "../../../entities/NormalUser";
import { IHashGenerator } from "../../../interfaces/IHashGenerator";
import { IUsersRepository } from "../../../repositories/INormalUsersRepository";
import { AppError } from "../../../utils/AppError";
import { ICreateNormalUserRequestDTO } from "./CreateNormalUserDTO";

export class CreateNormalUser{

    constructor(
       private NormalUsersRepository: IUsersRepository,
       private CreateBcryptHash: IHashGenerator
    )
    {}

    async execute({ name, CPF, email, password }: ICreateNormalUserRequestDTO){
        
        const userExist = await this.NormalUsersRepository.findByEmail(email)
        
        if(userExist){
            throw new AppError("Usuário já existe", 401)
        }

        const userCpfExist = await this.NormalUsersRepository.findByCPF(CPF)

        if(userCpfExist){
            throw new AppError("Usuário com CPF ja cadastrado", 401)
        }

        const passwordHash = await this.CreateBcryptHash.hash(password)

        const user =  new NormalUser({ name, email, CPF, passwordHash })
        
        await this.NormalUsersRepository.save(user)
    }
}