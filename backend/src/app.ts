import express, { json } from "express"
import { logger } from "./middlewares/logger";
import "dotenv/config"
import adsRoutes from "./routes/adsRoutes"

const app = express()

app.use(logger)
app.use(express.json())

app.use("/",adsRoutes)


export default app