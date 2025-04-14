
import "express-async-errors"
import express from "express"
import cors from "cors"
import  dotenv from "dotenv"
import { normalUserRoutes } from "./routes/normalUserRoutes"
import { errorHandling } from "./middleware/ErrorHandling"
import { sessionRoutes } from "./routes/sessionRoutes"
import { transactionRoutes } from "./routes/transactionRoutes"
import { sellerRoutes } from "./routes/sellerRoutes"


const app = express()

app.use(cors())
dotenv.config()
app.use(express.json())

app.use(normalUserRoutes)
app.use(sessionRoutes)
app.use(transactionRoutes)
app.use(sellerRoutes)


app.use(errorHandling)

export { app }