

import { Router } from "express"
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated"
import * as normalUserControllers from "./routesConfig/normalUserRoutesConfig"

const normalUserRoutes = Router()


normalUserRoutes.get("/user",  EnsureAuthenticated, normalUserControllers.indexNormalUserController.index.bind(normalUserControllers.indexNormalUserController))

normalUserRoutes.post("/user", normalUserControllers.createNormalUserController.create.bind(normalUserControllers.createNormalUserController))

normalUserRoutes.put("/user/:id", EnsureAuthenticated, normalUserControllers.updateNormalUserController.update.bind(normalUserControllers.updateNormalUserController))

normalUserRoutes.delete("/user/:id", EnsureAuthenticated, normalUserControllers.deleteNormalUserController.deleteUser.bind(normalUserControllers.deleteNormalUserController))

export { normalUserRoutes }