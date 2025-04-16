
import { Request, Response } from "express"
import { z } from "zod"
import { IndexSeller } from "../../useCases/SellerUseCase/IndexSeller/IndexSellerUseCase"

export class IndexSellerController{

    constructor(
        private indexSellerUseCase: IndexSeller
    ){}

        async index(req: Request, res: Response){
    
            const sellers =  await this.indexSellerUseCase.execute()
    
            res.status(200).json({ message: sellers.length > 0 ? sellers: "Não existe usuários na tabela" })
        }
}