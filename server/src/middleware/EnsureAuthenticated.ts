
import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import { verify } from "jsonwebtoken"
import { authConfig } from "../config/jwt"

export function EnsureAuthenticated(req: Request, res: Response, next: NextFunction ){

    
    interface TokenPayload{
        email: string,
        sub: string
    }
    
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError("Usuário não autenticado", 401)
    }

    const authHeaderToken = authHeader.slice(7)

    const {sub: userId, email } = verify(authHeaderToken, authConfig.jwt.secret) as TokenPayload

    req.user = {
        id: userId,
        email
    }

    return next()
}