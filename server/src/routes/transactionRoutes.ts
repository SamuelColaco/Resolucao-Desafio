
import { Router } from "express"
import { TransactionController } from "../controller/TransactionController"
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated"

const transactionRoutes = Router()

const transactionController = new TransactionController()

transactionRoutes.post("/transfer/:payeeId", EnsureAuthenticated, transactionController.create)
transactionRoutes.post("/transfer/seller/:sellerId", EnsureAuthenticated, transactionController.createTransactionSeller)

export { transactionRoutes }
