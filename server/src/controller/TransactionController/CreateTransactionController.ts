
import { Request, Response } from "express"
import { z } from "zod"
import { AppError } from "../../utils/AppError"
import { CreateTransaction } from "../../useCases/TransactionUserCases/CreateTransaction/CreateTransactionUseCase"


export class CreateTransactionController{

    constructor(
        private createTransactionUseCase: CreateTransaction
    ){}
    async create(req: Request, res: Response){
    
            const paramSchema = z.object({
                payeeId: z.string().uuid()
            })
    
            const { payeeId } = paramSchema.parse(req.params)
    
            const bodySchema = z.object({
                amount: z.number().positive("Tem que ser positivo o valor")
            })
    
            const { amount } = bodySchema.parse(req.body)
    
            if(!req.user?.id){
                throw new AppError("Usuário não autenticado", 401)
            }
    
            await this.createTransactionUseCase.execute({ payerId: req.user.id, payeeId, amount})
    
    
            res.status(201).json({ "value": amount, "payer": req.user.id, "payee": payeeId})
    
        }
}