
import { Request, Response } from "express"
import { CreateSeller } from "../../useCases/SellerUseCase/CreateSeller/CreateSellerUseCase"
import { z } from "zod"

export class CreateSellerController{

    constructor(
        private createSellerUseCase: CreateSeller
    ){}

        async create(req: Request, res: Response){
            
            const bodySchema = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(6),
                CNPJ: z.string().length(14, {message: "CNPJ prescisa ter 14 dígitos"})
            })
    
            const { name, email, password, CNPJ } = bodySchema.parse(req.body)
    
            await this.createSellerUseCase.execute({ name, email, password, CNPJ})
    
            res.status(201).json({ message: "Usuário cadastrado com sucesso"})
        }
    
}