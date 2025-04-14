
import { Router } from "express"
import { SessionController } from "../controller/SessionController"

const sessionRoutes = Router()

const sessionController = new SessionController()

sessionRoutes.post("/session", sessionController.create)

export { sessionRoutes }
