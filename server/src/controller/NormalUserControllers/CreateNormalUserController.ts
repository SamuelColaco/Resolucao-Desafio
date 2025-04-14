
import{ Request, Response } from "express"
import { CreateNormalUser } from "../../useCases/NormalUserCases/CreateUser/CreateNormalUserUserCase"
import { z } from "zod"

export class CreateNormalUserController{

    constructor(
        private createUserUseCase: CreateNormalUser
    ){}

       async create(req: Request, res: Response){
    
            const bodySchema = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(6),
                cpf: z.string().length(11, { message: "O cpf prescisa ter 11 digitos"})
            })
    
            const { name, email, password, cpf } = bodySchema.parse(req.body)

            await this.createUserUseCase.execute({ name, CPF: cpf, email, password})

    
            res.status(201).json({ message: "Usuário criado com sucesso no controller usuário"})

        }
}