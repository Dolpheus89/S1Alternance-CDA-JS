import express from "express"
import { logger } from "./middlewares/logger";
import "./utils/dbConfig"
import "dotenv/config"
import adsRoutes from "./routes/adsRoutes"
import moviesRoute from "./routes/moviesRoutes"
import { initDB } from "./utils/dbConfig";

const app = express()

initDB()

app.use(logger)
app.use(express.json())

app.use("/ads",adsRoutes)
app.use("/movies", moviesRoute)


export default app