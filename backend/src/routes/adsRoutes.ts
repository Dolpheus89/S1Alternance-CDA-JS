import {Router} from "express"
import * as adsControllers from "../controllers/adsController"

const router = (Router())

router.get("/", adsControllers.getAll)

router.post("/", adsControllers.create)

export default router