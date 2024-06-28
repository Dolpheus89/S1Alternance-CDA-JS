import express from "express"
import { logger } from "./middlewares/logger"
import "./utils/db"
import "dotenv/config"
import adsRoutes from "./routes/adsRoutes"
import tagsRoutes from "./routes/tagsRoutes"

const app = express()

app.use(logger)
app.use(express.json())

app.use("/ads", adsRoutes)
app.use("/tags", tagsRoutes)

export default app
