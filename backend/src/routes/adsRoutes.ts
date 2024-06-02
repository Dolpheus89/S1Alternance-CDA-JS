import {Router} from "express"
import * as adsControllers from "../controllers/adsController"

const router = (Router())

router.get("/", adsControllers.getAll)

router.post("/", adsControllers.create)

router.put("/:id", adsControllers.update)

router.delete("/:id", adsControllers.remove)

export default router