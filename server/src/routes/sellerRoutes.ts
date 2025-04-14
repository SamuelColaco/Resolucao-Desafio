
import { Router } from "express"
import { SellerController } from "../controller/SellerController"
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated"


const sellerRoutes = Router()

const sellerController = new SellerController()

sellerRoutes.get("/seller", EnsureAuthenticated, sellerController.index)
sellerRoutes.post("/seller", sellerController.create)
sellerRoutes.put("/seller/:id", EnsureAuthenticated, sellerController.update)
sellerRoutes.delete("/seller/:id", EnsureAuthenticated, sellerController.deleteSeller)


export { sellerRoutes }
