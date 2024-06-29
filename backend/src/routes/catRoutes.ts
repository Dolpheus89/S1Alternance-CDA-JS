import { Router } from "express"
import * as catControllers from "../controllers/catController"

const router = Router()

router.get("/", catControllers.getAllCategories)

export default router
