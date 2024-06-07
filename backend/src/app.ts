import express from "express"
import { logger } from "./middlewares/logger";
import "./utils/dbConfig"
import "dotenv/config"
import adsRoutes from "./routes/adsRoutes"

const app = express()

app.use(logger)
app.use(express.json())

app.use("/ads",adsRoutes)


export default app