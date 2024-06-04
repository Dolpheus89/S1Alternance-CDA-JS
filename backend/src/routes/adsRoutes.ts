import {Router} from "express"
import * as adsControllers from "../controllers/adsController"

const router = (Router())

router.get("/", adsControllers.getLocation)
router.get("/AVGPrice/", adsControllers.getLocationPriceAVG)

router.post("/", adsControllers.create)

router.put("/:id", adsControllers.update)
router.put("/:price/:date", adsControllers.updatePriceFromDate)

router.delete("/", adsControllers.remove)

export default router