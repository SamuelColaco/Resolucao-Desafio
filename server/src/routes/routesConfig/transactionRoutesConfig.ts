
import { CreateTransactionController } from "../../controller/TransactionController/CreateTransactionController";
import { CreateTransactionSellerController } from "../../controller/TransactionController/CreateTransactionSellerController";
import { GetAxiosAuthorizeRequest } from "../../infra/authorize/GetAxiosAuthorizeRequest";
import { GetAxiosNotificationRequest } from "../../infra/notification/GetAxiosNotificationRequest";
import { PrismaTransactionRepository } from "../../repositories/IPrismaTransactionRepository";
import { CreateTransaction } from "../../useCases/TransactionUserCases/CreateTransaction/CreateTransactionUseCase";
import { CreateTransactionSeller } from "../../useCases/TransactionUserCases/CreateTransactionUserFromSeller/CreateTransactionSeller";


const transactionRepository = new PrismaTransactionRepository()

const getAxiosAuthorize = new GetAxiosAuthorizeRequest()

const getAxiosNotification = new GetAxiosNotificationRequest()

const createTransactionUseCase = new CreateTransaction(transactionRepository, getAxiosAuthorize, getAxiosNotification)

const createTransactionSellerUseCase = new CreateTransactionSeller(transactionRepository, getAxiosAuthorize, getAxiosNotification)

export const createTransactionController = new CreateTransactionController(createTransactionUseCase)

export const createTransactionSellerController = new CreateTransactionSellerController(createTransactionSellerUseCase)