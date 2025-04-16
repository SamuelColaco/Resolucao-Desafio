
import { Router } from "express"
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated"
import * as transactionController from "./routesConfig/transactionRoutesConfig"

const transactionRoutes = Router()

transactionRoutes.post("/transfer/:payeeId", EnsureAuthenticated, transactionController.createTransactionController.create.bind(transactionController.createTransactionController))

transactionRoutes.post("/transfer/seller/:sellerId", EnsureAuthenticated, transactionController.createTransactionSellerController.createTransactionSeller.bind(transactionController.createTransactionSellerController))

export { transactionRoutes }
