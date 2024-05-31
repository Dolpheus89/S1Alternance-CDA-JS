import {ads} from "../utils/db"

export interface Ad {
    id: number,
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    createdAt: string,
  }

export const getAllAds = (): Ad[] => {
    const result:Ad[] = ads
    return result
}


export const postAds = (    
    title?: string,
    description?: string,
    owner?: string,
    price?: number,
    picture?: string,
    location?: string,
    createdAt?: string,): Ad[]=> {

    const newAD:Ad = {
        id: ads.length ? ads[ads.length-1].id + 1  : 1,
        title: title || "Untitled",
        description: description || "No description",
        owner: owner || "Unknown",
        price: price !== undefined ? price : 0,
        picture: picture || "default.jpg",
        location: location || "Unknown",
        createdAt: createdAt || new Date().toISOString()
    }

    ads.push(newAD)

    return ads
}
