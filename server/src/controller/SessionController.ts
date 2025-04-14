
import { Request, Response} from "express"
import { z } from "zod"
import { prisma } from "../database/prisma"
import { AppError } from "../utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "../config/jwt"
import { sign } from "jsonwebtoken"

export class SessionController{
    
    async create(req: Request, res: Response){

        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const { email, password } = bodySchema.parse(req.body)

        const userExist = await prisma.normalUser.findFirst({ where: { email }})

        if(!userExist){
            throw new AppError("Usuário não existe", 401)
        }


        const passwordExist =  await compare(password, userExist.passwordHash)


        if(!passwordExist){
            throw new AppError("Senha e/ou email incorretos", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        
        const token = sign({ email: userExist.email }, secret, {
            subject: userExist.id,
            expiresIn
        })

        res.status(201).json({ "token": token })
    }
}