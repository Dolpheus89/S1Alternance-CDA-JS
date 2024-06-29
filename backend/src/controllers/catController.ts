import { Request, Response } from "express"
import * as catModel from "../models/catModels"

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await catModel.getCategories()
        res.json(categories)
    } catch (err) {
        res.status(500).json({ message: `Failed to catch argument ${err}` })
    }
}
