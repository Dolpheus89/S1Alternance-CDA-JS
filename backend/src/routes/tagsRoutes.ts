import { Router } from "express"
import * as tagsControllers from "../controllers/tagsController"

const router = Router()

router.get("/", tagsControllers.getTags)

router.delete("/:id",tagsControllers.remove)

export default router
