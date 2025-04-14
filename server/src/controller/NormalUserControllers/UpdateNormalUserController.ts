

import{ Request, Response } from "express"
import { UpdateNormalUser } from "../../useCases/NormalUserCases/UpdateUser/UpdateNormalUserUserCase"
import { z } from "zod"

export class UpdateNormalUserController{

    constructor(
        private updateNormalUserUseCase: UpdateNormalUser
    ){}

      async update(req: Request, res: Response){
    
            const paramSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramSchema.parse(req.params)
            
            const bodySchema = z.object({
                name: z.string().optional(),
                email: z.string().email().optional(),
                password: z.string().min(6).optional(),
                CPF: z.string().length(11, { message: "O cpf prescisa ter 11 digitos"}).optional()
            })
    
            const { name, email, password, CPF } = bodySchema.parse(req.body)
    
            await this.updateNormalUserUseCase.execute({ id, name, email, password, CPF})
    
            res.status(200).json({ message: "Usuário atualizado"})
    
        }

}