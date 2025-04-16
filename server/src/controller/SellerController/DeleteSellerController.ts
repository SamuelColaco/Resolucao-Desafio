
import { Request, Response } from "express"
import { z } from "zod"
import { DeleteSeller } from "../../useCases/SellerUseCase/DeleteSeller/DeleteSellerUseCase"

export class DeleteSellerController{

    constructor(
        private deleteSellerUseCase: DeleteSeller
    ){}

        async deleteSeller(req: Request, res: Response){

            const paramSchema = z.object({
                id: z.string().uuid()
            })

            const { id } = paramSchema.parse(req.params)

            await this.deleteSellerUseCase.execute({ id })

            res.status(200).json({ message: "Usuário deletado com sucesso"})
        }
}