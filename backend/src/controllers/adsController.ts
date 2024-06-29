import { Request, Response } from "express"
import * as adsModel from "../models/adsModel"
import * as tagsModel from "../models/tagsModel"

export const getLocation = async (req: Request, res: Response) => {
    try {
        const location = req.query.location as string
        const ads = await adsModel.getLocationAds(location)
        res.json(ads)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}

export const getLocationPriceAVG = async (req: Request, res: Response) => {
    try {
        const location = req.query.location as string
        const ad = await adsModel.getAveragePrice(location)
        res.json(ad)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}

export const getCategoryAds = async (req: Request, res: Response) => {
    try {
        const cat1 = req.query.cat1 as string
        const cat2 = req.query.cat2 as string | undefined

        const result = await adsModel.getAdsByCategory(cat1, cat2)
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}

export const getAdsByTag = async (req: Request, res: Response) => {
    try {
        const tag = req.params.tag

        const result = await adsModel.getAdsByTags(tag)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}

export const getCatPriceAVG = async (req: Request, res: Response) => {
    try {
        const category = req.query.category as string
        const cat = await adsModel.getAvgPriceCategory(category)

        res.json(cat)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            owner,
            price,
            picture,
            location,
            category,
            tags,
        } = req.body
        const checkedCategory = await adsModel.checkCategory(category)
        const checkedTags = await tagsModel.checkTags(tags)
        const newAd = await adsModel.postAds(
            title,
            owner,
            checkedCategory,
            description,
            price,
            picture,
            location,
            checkedTags
        )
        res.status(202).json(newAd)
    } catch (err) {
        res.status(500).json({ message: "Failed to create ads" + err })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const allowedProperties = [
            "title",
            "description",
            "owner",
            "price",
            "picture",
            "location",
            "category",
            "tags",
        ]
        const updatedAdData: { [key: string]: any } = {}

        Object.entries(req.body).forEach(([key, value]) => {
            if (allowedProperties.includes(key)) {
                if (
                    typeof value === "string" ||
                    typeof value === "number" ||
                    typeof value === "undefined"
                ) {
                    updatedAdData[key] = value as string | number | undefined
                }
            }
        })
        if ("category" in updatedAdData) {
            updatedAdData.category = await adsModel.checkCategory(
                updatedAdData.category
            )
        }
        if ("tags" in updatedAdData) {
            updatedAdData.tags = await tagsModel.checkTags(updatedAdData.tags)
        }

        const updated = await adsModel.putAds(id, updatedAdData)
        res.status(202).json(updated)
    } catch (err) {
        res.status(500).json({ message: `Failed to update ad: ${err}` })
    }
}
export const remove = async (req: Request, res: Response) => {
    try {
        let ids: number[] = []
        req.params.id.split(",").map((id: string) => ids.push(parseInt(id)))

        const deletedId = await adsModel.deleteAds(ids)

        res.status(202).send(`delete ${deletedId} data successfully`)
    } catch (err) {
        res.status(500).json({ message: "Failed to delete ads" })
    }
}
