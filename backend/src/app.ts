import express from "express"
import { logger } from "./middlewares/logger";
import "dotenv/config"
import adsRoutes from "./routes/adsRoutes"
import moviesRoute from "./routes/moviesRoutes"

const app = express()

app.use(logger)
app.use(express.json())

app.use("/",adsRoutes)
app.use("/movies", moviesRoute)


export default app