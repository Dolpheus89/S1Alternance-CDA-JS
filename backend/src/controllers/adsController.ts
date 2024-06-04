import { Request, Response } from 'express';
import * as adsModel from "../models/adsModel"

export const getLocation = async (req:Request, res:Response) => {
    try {
        const location = req.query.location as string
        const ads = await adsModel.getLocationAds(location)
        res.json(ads)
    } catch (err) {
        res.status(500).json({message: `Failed to catch argument ${err}`})
    }
}

export const getLocationPriceAVG = async (req:Request, res:Response) => {
    try {
        const location = req.query.location as string
        const ad = await adsModel.getAveragePrice(location)
        res.json(ad)
    } catch (err) {
        res.status(500).json({message: `Failed to catch argument ${err}`})
    }
}

export const create = async (req:Request , res:Response) => {
    try {
        const { title, description, owner, price, picture, location} = req.body
        await adsModel.postAds(title, description, owner, price, picture, location )
        res.status(202).send('new ad created')
    }catch(err){
        res.status(500).json({message: "Failed to create ads"})
    }
}

export const update = async (req:Request , res:Response) => {
    try {
        const id = parseInt(req.params.id)
        const allowedProperties = ["title", "description", "owner", "price", "picture", "location"];
        const updatedAdData = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowedProperties.includes(key))
          );

        await adsModel.putAds(id,updatedAdData)
        res.status(200).send(`updated data on id ${id}`)
    }catch(err){
        res.status(500).json({message: "Failed to update ad"})
    }
}

export const updatePriceFromDate =  async(req: Request, res: Response) => {
    try {
      const price = parseInt(req.params.price);
      if (isNaN(price)) {
        throw new Error("Invalid price");
      }
  
      const date = req.params.date;
      if (!date) {
        throw new Error("Missing date");
      }
  
      const day = parseInt(date.substring(0, 2), 10);
      const month = parseInt(date.substring(2, 4), 10)-1;
      const year = parseInt(date.substring(4, 8), 10);

      const parsedDate = new Date();
      parsedDate.setFullYear(year);
      parsedDate.setMonth(month);
      parsedDate.setDate(day);
  
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date");
      }
        await adsModel.putAdPriceFromDate({ price: price, date: parsedDate})
        res.status(202).send(`updated price ${price}€ for ${parsedDate}`)
    } catch(err){
        res.status(500).json({message: `Failed to update price on ad ${err}`})
    }
}

export const remove = async (req:Request, res:Response) => {
    try {
        const query: {id?:number, price?: number} = {}

        if (req.query.id){
            query.id = parseInt(req.query.id as string)
        }   else if (req.query.price) {
            query.price = parseFloat(req.query.price as string);
          } else {
            res.status(400).json({ message: 'Arguments not found' });
            return;
          }

         await adsModel.deleteAds(query)

        query.id ?
        res.status(202).send(`delete ad with id ${query.id} was successfully`):
        res.status(202).send(`delete ad with price > ${query.price} was successfully`)
    }catch(err) {
        res.status(500).json({message: "Failed to delete ads"})
    }
} 