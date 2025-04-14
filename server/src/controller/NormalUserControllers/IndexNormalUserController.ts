

import { Request, Response } from "express"
import { PrismaNormalUserRepository } from "../../repositories/IPrismaNormalUserRepository"
import { IndexNormalUser } from "../../useCases/NormalUserCases/IndexUser/IndexNormalUserUserCase"
export class IndexNormalUserController{

    constructor(
        private indexNormalUserUseCase: IndexNormalUser
    ){}
     async index(req: Request, res: Response){ 
    
            const userExist = await this.indexNormalUserUseCase.execute()
    
            res.status(200).json({ message: userExist.length > 0 ? userExist : "Não tem usuários"})
    
        }
}