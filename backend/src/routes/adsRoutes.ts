import { Router } from "express"
import * as adsControllers from "../controllers/adsController"

const router = Router()

router.get("/", adsControllers.getLocation)
router.get("/AVGPrice/", adsControllers.getLocationPriceAVG)
router.get("/categories/", adsControllers.getCategoryAds)
router.get("/AVGPriceCat/", adsControllers.getCatPriceAVG)
router.get("/tags/:tag", adsControllers.getAdsByTag)

router.post("/", adsControllers.create)

router.put("/:id", adsControllers.update)

router.delete("/:id", adsControllers.remove)

export default router
