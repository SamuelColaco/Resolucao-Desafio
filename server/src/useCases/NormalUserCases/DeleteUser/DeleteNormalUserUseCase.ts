import { IUsersRepository } from "../../../repositories/INormalUsersRepository";
import { AppError } from "../../../utils/AppError";
import { IDeleteNormalUserRequestDTO } from "./DeleteNormalUserDTO";

export class DeleteNormalUser{
    constructor(
        private normalUserRepository: IUsersRepository
    ){}

    async execute({ id }: IDeleteNormalUserRequestDTO){

        const userExist = await this.normalUserRepository.findById(id)

        if(!userExist){
            throw new AppError("Usuário não achado", 404)
        }

        await this.normalUserRepository.delete(userExist)
    }
}