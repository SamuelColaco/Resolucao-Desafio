
import { Request, Response } from "express" 
import { z } from "zod"
import { AppError } from "../utils/AppError"
import { PrismaTransactionRepository } from "../repositories/IPrismaTransactionRepository"
import { CreateTransaction } from "../useCases/TransactionUserCases/CreateTransaction/CreateTransactionUseCase"
import { GetAxiosAuthorizeRequest } from "../infra/authorize/GetAxiosAuthorizeRequest"
import { CreateTransactionSeller } from "../useCases/TransactionUserCases/CreateTransactionUserFromSeller/CreateTransactionSeller"
import { GetAxiosNotificationRequest } from "../infra/notification/GetAxiosNotificationRequest"

export class TransactionController{
    
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

        const transactionRepository =  new PrismaTransactionRepository()

        const getAxiosAuthorizeRequest = new GetAxiosAuthorizeRequest()

        const getAxiosNotifcationRequest = new GetAxiosNotificationRequest()

        const createTransactionUseCase = new CreateTransaction(transactionRepository, getAxiosAuthorizeRequest, getAxiosNotifcationRequest)

        await createTransactionUseCase.execute({ payerId: req.user.id, payeeId, amount})


        res.status(201).json({ "value": amount, "payer": req.user.id, "payee": payeeId})

    }

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

        const transactionRepository =  new PrismaTransactionRepository()

        const getAxiosAuthorizeRequest = new GetAxiosAuthorizeRequest()

        const getAxiosNotificationRequest = new GetAxiosNotificationRequest()

        const createTransactionSellerUseCase = new CreateTransactionSeller(transactionRepository, getAxiosAuthorizeRequest, getAxiosNotificationRequest)

        await createTransactionSellerUseCase.execute({ payerId: req.user.id, sellerId, amount})


        res.status(201).json({ "value": amount, "payer": req.user.id, "payee": sellerId})
    }
}