
import { Request, Response } from "express"
import { z } from "zod"
import { UpdateSeller } from "../../useCases/SellerUseCase/UpdateSeller/UpdateSellerUseCase"

export class UpdateSellerController{
    constructor(
        private updateSellerUseCase: UpdateSeller
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
                    CNPJ: z.string().length(14, { message: "O CNPJ prescisa ter 14 digitos"}).optional()
                })
        
                const { name, email, password, CNPJ } = bodySchema.parse(req.body)
    
        
                await this.updateSellerUseCase.execute({ id, name, email, password, CNPJ})
        
                res.status(200).json({ message: "Usuário atualizado"})
        
            }
}