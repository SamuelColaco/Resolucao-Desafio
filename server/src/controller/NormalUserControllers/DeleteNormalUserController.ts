
import { Request, Response } from "express"
import { z } from "zod"
import { DeleteNormalUser } from "../../useCases/NormalUserCases/DeleteUser/DeleteNormalUserUseCase"

export class DeleteNormalUserController{

    constructor(
        private deleteNormalUserUseCase: DeleteNormalUser
    ){}
    
        async deleteUser(req: Request, res: Response){
    
            const paramSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramSchema.parse(req.params)
    
            await this.deleteNormalUserUseCase.execute({ id })
    
            res.status(200).json({ message: "Usuário deletado com sucesso"})
        }
}