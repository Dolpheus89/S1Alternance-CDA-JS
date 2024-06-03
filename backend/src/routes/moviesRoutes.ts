import {Router} from "express"
import * as moviesControllers from "../controllers/moviesController"

const router = Router()

router.get("/" , moviesControllers.getFilteredMovie)

router.get("/count" , moviesControllers.getAllCount)
router.get("/totalBudget" , moviesControllers.getAllPrice)

router.post("/",moviesControllers.postMovie)

router.put("/:id",moviesControllers.updateMovie)

router.delete("/:ids",moviesControllers.removeMovie)


export default router