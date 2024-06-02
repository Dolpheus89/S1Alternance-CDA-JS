import {Router} from "express"
import * as moviesControllers from "../controllers/moviesController"

const router = Router()

router.get("/" , moviesControllers.getFilteredMovie)

router.get("/count" , moviesControllers.getAllCount)
router.get("/totalBudget" , moviesControllers.getAllPrice)

router.post("/",moviesControllers.postMovie)


export default router