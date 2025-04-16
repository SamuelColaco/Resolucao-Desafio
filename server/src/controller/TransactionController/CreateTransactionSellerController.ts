
import { Request, Response } from "express"
import { z } from "zod"
import { AppError } from "../../utils/AppError"
import { CreateTransactionSeller } from "../../useCases/TransactionUserCases/CreateTransactionUserFromSeller/CreateTransactionSeller"

export class CreateTransactionSellerController{

    constructor(
        private createTransactionSellerUseCase: CreateTransactionSeller
    ){}

      async createTransactionSeller(req: Request, res: Response){
            const paramSchema = z.object({
                sellerId: z.string().uuid()
            })
    
            const { sellerId } = paramSchema.parse(req.params)
    
            const bodySchema = z.object({
                amount: z.number().positive("Tem que ser positivo o valor")
            })
    
            const { amount } = bodySchema.parse(req.body)
    
            if(!req.user?.id){
                throw new AppError("Usuário não autenticado", 401)
            }
    
            await this.createTransactionSellerUseCase.execute({ payerId: req.user.id, sellerId, amount})
    
    
            res.status(201).json({ "value": amount, "payer": req.user.id, "payee": sellerId})
        }
}