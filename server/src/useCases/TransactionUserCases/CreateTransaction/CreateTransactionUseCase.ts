
import { Transaction } from "../../../entities/Transaction";
import { GetAxiosAuthorizeRequest } from "../../../infra/authorize/GetAxiosAuthorizeRequest";
import { IGetNotificationRequest } from "../../../interfaces/IGetNotificationRequest";
import { IGetRequest } from "../../../interfaces/IGetRequest";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";
import { AppError } from "../../../utils/AppError";
import { ICreateTransactionDTO } from "./CreateTransactionDTO";


export class CreateTransaction{
    constructor(
        private TransactionRepository: ITransactionRepository,
        private GetAxiosAuthorizeRequest: IGetRequest,
        private GetAxiosNotificationRequest: IGetNotificationRequest
    ){}

    async execute({ payerId, payeeId, sellerId,  date, amount}: ICreateTransactionDTO){

        const userExist =  await this.TransactionRepository.findPayerById(payerId)

        let payee;

        let seller;

        if(!userExist){
            throw new AppError("Usuário não logado", 401)
        }

        if(payeeId){
            payee = await this.TransactionRepository.findPayeeById(payeeId)
            if(!payee){
                throw new AppError("Usuário não encontrado", 404)
            }
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


        const transaction =  new Transaction({ payerId, payeeId, sellerId, date, amount, User: userExist, ReceivedUser: payee})

        await this.TransactionRepository.save(transaction)
    }
}