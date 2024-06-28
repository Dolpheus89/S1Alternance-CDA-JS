import { Request, Response } from "express"
import * as tagsModel from "../models/tagsModel"

export const getTags = async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        const tags = await tagsModel.getTagsByName(name)
        res.json(tags)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        let ids: number[] = []
        req.params.id.split(",").map((id: string) => ids.push(parseInt(id)))

        const deletedID = await tagsModel.deleteTags(ids)

        res.status(202).send(`delete ${deletedID} tags data successfully`)
    } catch (err) {
        res.status(500).json({ message: "Failed to dele tags" })
    }
}
