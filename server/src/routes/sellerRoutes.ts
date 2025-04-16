
import { Router } from "express"
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated"
import * as sellerController from "./routesConfig/sellerRoutesConfig"


const sellerRoutes = Router()

sellerRoutes.get("/seller", EnsureAuthenticated, sellerController.indexSellerController.index.bind(sellerController.indexSellerController))

sellerRoutes.post("/seller", sellerController.createSellerController.create.bind(sellerController.createSellerController))

sellerRoutes.put("/seller/:id", EnsureAuthenticated, sellerController.updateSellerController.update.bind(sellerController.updateSellerController))

sellerRoutes.delete("/seller/:id", EnsureAuthenticated, sellerController.deleteSellerController.deleteSeller.bind(sellerController.deleteSellerController))


export { sellerRoutes }
