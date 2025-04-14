import { Transaction } from "../../../entities/Transaction";
import { GetAxiosAuthorizeRequest } from "../../../infra/authorize/GetAxiosAuthorizeRequest";
import { IGetNotificationRequest } from "../../../interfaces/IGetNotificationRequest";
import { IGetRequest } from "../../../interfaces/IGetRequest";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";
import { AppError } from "../../../utils/AppError";
import { ICreateTransactionSellerDTO } from "./CreateTransactionSellerDTO";


export class CreateTransactionSeller{
    constructor(
        private TransactionRepository: ITransactionRepository,
        private GetAxiosAuthorizeRequest: IGetRequest,
        private GetAxiosNotificationRequest: IGetNotificationRequest
    ){}

    async execute({ payerId, payeeId, sellerId,  date, amount}: ICreateTransactionSellerDTO){

        const userExist =  await this.TransactionRepository.findPayerById(payerId)

        let seller;

        if(!userExist){
            throw new AppError("Usuário não logado", 401)
        }

        if(sellerId){
            seller  = await this.TransactionRepository.findSellerById(sellerId)
            if(!seller){
                throw new AppError("Vendedor não encontrado", 404)
            }
        }

        if(userExist.balance  < amount){
            throw new AppError("Saldo não suficiente")
        }

        const authorize = await this.GetAxiosAuthorizeRequest.authorize()

        if(!authorize){
            throw new AppError("Transferência negada", 401)
        }

        const notification = await this.GetAxiosNotificationRequest.notification()

        if(!notification){
            console.warn("Erro ao enviar notificação")
        }


        const transaction =  new Transaction({ payerId, payeeId, sellerId, date, amount, User: userExist, Seller: seller})

        await this.TransactionRepository.saveSellerTransfer(transaction)

    }
}