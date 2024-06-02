import { Request, Response } from 'express';
import * as adsModel from "../models/adsModel"

export const getAll = (req:Request,res:Response) => {
    try {
        const ads = adsModel.getAllAds()
        res.json(ads)
    } catch(err) {
        res.status(500).json({message: "Failed to retrieve ads"})
    }
}

export const create = (req:Request , res:Response) => {
    try {
        const { title, description, owner, price, picture, location, createdAt } = req.body
        const newads = adsModel.postAds(title, description, owner, price, picture, location, createdAt )
        res.json(newads)
    }catch(err){
        res.status(500).json({message: "Failed to create ads"})
    }
}

export const update = (req:Request , res:Response) => {
    try {
        const id = parseInt(req.params.id)
        const { title, description, owner, price, picture, location, createdAt } = req.body
        const updatedAd = adsModel.putAds(id, title, description, owner, price, picture, location, createdAt )
        res.json(updatedAd)
    }catch(err){
        res.status(500).json({message: "Failed to update ad"})
    }
}

export const remove = (req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.id)
        const ads = adsModel.deleteAds(id)
        res.json(ads)
    }catch(err) {
        res.status(500).json({message: "Failed to delete ads"})
    }
} 