
import { NormalUser } from "../../../entities/NormalUser"
import { IUsersRepository } from "../../../repositories/INormalUsersRepository"

export class IndexNormalUser{
    constructor(
        private NormalUserRepository: IUsersRepository
    ) {}

    async execute() : Promise<NormalUser[]>{
        
       return await this.NormalUserRepository.findAll()

    }
}