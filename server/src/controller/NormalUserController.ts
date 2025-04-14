

import { Request, Response } from "express"
import { z } from "zod"
import { PrismaNormalUserRepository } from "../repositories/IPrismaNormalUserRepository"
import { CreateBcryptHash } from "../infra/crypt/CreateBcryptHash"
import { CreateNormalUser } from "../useCases/NormalUserCases/CreateUser/CreateNormalUserUserCase"
import { DeleteNormalUser } from "../useCases/NormalUserCases/DeleteUser/DeleteNormalUserUseCase"
import { IndexNormalUser } from "../useCases/NormalUserCases/IndexUser/IndexNormalUserUserCase"
import { UpdateNormalUser } from "../useCases/NormalUserCases/UpdateUser/UpdateNormalUserUserCase"

export class NormalUserController{
    async index(req: Request, res: Response){

        const normalUserRepository = new PrismaNormalUserRepository()

        const indexNormalUserUseCase = new IndexNormalUser(normalUserRepository)

        const userExist = await indexNormalUserUseCase.execute()

        res.status(200).json({ message: userExist.length > 0 ? userExist : "Não tem usuários"})

    }

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            cpf: z.string().length(11, { message: "O cpf prescisa ter 11 digitos"})
        })

        const { name, email, password, cpf } = bodySchema.parse(req.body)

        const normalUserRepository = new PrismaNormalUserRepository()

        const createBcryptHash = new CreateBcryptHash()

        const createUserUseCase = new CreateNormalUser(normalUserRepository, createBcryptHash)

        await createUserUseCase.execute({ name, CPF: cpf, email, password})

        res.status(201).json({ message: "Usuário criado com sucesso"})
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
            CPF: z.string().length(11, { message: "O cpf prescisa ter 11 digitos"}).optional()
        })

        const { name, email, password, CPF } = bodySchema.parse(req.body)

        const normalUserRepository = new PrismaNormalUserRepository()

        const createBcryptHash = new CreateBcryptHash()

        const updateNormalUserUseCase = new UpdateNormalUser(normalUserRepository, createBcryptHash)

        await updateNormalUserUseCase.execute({ id, name, email, password, CPF})

        res.status(200).json({ message: "Usuário atualizado"})

    }

    async deleteUser(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const normalUserRepository = new PrismaNormalUserRepository()

        const deleteNormalUserUseCase = new DeleteNormalUser(normalUserRepository)

        await deleteNormalUserUseCase.execute({ id })

        res.status(200).json({ message: "Usuário deletado com sucesso"})
    }
}