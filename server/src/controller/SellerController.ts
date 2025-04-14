
import { Request, Response } from "express"
import { PrismaSellerRepository } from "../repositories/IPrismaSellerRepository"
import { IndexSeller } from "../useCases/SellerUseCase/IndexSeller/IndexSellerUseCase"
import { z } from "zod"
import { CreateBcryptHash } from "../infra/crypt/CreateBcryptHash"
import { CreateSeller } from "../useCases/SellerUseCase/CreateSeller/CreateSellerUseCase"
import { UpdateSeller } from "../useCases/SellerUseCase/UpdateSeller/UpdateSellerUseCase"
import { DeleteSeller } from "../useCases/SellerUseCase/DeleteSeller/DeleteSellerUseCase"

export class SellerController{

    async index(req: Request, res: Response){

        const sellerRepository = new PrismaSellerRepository()

        const indexSellerUseCase = new IndexSeller(sellerRepository)

        const sellers =  await indexSellerUseCase.execute()

        res.status(200).json({ message: sellers.length > 0 ? sellers: "Não existe usuários na tabela" })
    }

    async create(req: Request, res: Response){
        
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            CNPJ: z.string().length(14, {message: "CNPJ prescisa ter 14 dígitos"})
        })

        const { name, email, password, CNPJ } = bodySchema.parse(req.body)

        const sellerRepository = new PrismaSellerRepository()

        const createBcryptHash =  new CreateBcryptHash()

        const createSellerUseCase = new CreateSeller(sellerRepository, createBcryptHash)

        await createSellerUseCase.execute({ name, email, password, CNPJ})

        res.status(201).json({ message: "Usuário cadastrado com sucesso"})
    }

    
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
    
            const sellerRepository = new PrismaSellerRepository()
    
            const createBcryptHash = new CreateBcryptHash()
    
            const updateSellerUseCase = new UpdateSeller(sellerRepository, createBcryptHash)
    
            await updateSellerUseCase.execute({ id, name, email, password, CNPJ})
    
            res.status(200).json({ message: "Usuário atualizado"})
    
        }

        async deleteSeller(req: Request, res: Response){

            const paramSchema = z.object({
                id: z.string().uuid()
            })

            const { id } = paramSchema.parse(req.params)

            const sellerRepository = new PrismaSellerRepository()

            const deleteSellerUseCase = new DeleteSeller(sellerRepository)

            await deleteSellerUseCase.execute({ id })

            res.status(200).json({ message: "Usuário deletado com sucesso"})
        }
}