import express from "express"
import cors from "cors"
import { logger } from "./middlewares/logger"
import "./utils/db"
import "dotenv/config"
import adsRoutes from "./routes/adsRoutes"
import tagsRoutes from "./routes/tagsRoutes"
import catRoutes from "./routes/catRoutes"

const app = express()

app.use(cors())
app.use(logger)
app.use(express.json())

app.use("/ads", adsRoutes)
app.use("/tags", tagsRoutes)
app.use("/categories", catRoutes)

export default app
