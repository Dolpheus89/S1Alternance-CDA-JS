import {ads} from "../utils/fakeDB"

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

export const putAds = (
    id:number,
    title?: string,
    description?: string,
    owner?: string,
    price?: number,
    picture?: string,
    location?: string,
    createdAt?: string
): Ad[] => {

    const findId = ads.filter(element => element.id === id)

    if(findId.length === 0){
        console.log(`${id} non trouvé pour la modification`);
        return ads
    }

    for (let element in findId){
        if (title !== undefined){ findId[element].title = title}
        if (description !== undefined){ findId[element].description = description}
        if (owner !== undefined){ findId[element].owner = owner}
        if (price !== undefined){ findId[element].price = price}
        if (picture !== undefined){ findId[element].picture = picture}
        if (location !== undefined){ findId[element].location = location}
        if (createdAt !== undefined){ findId[element].createdAt = createdAt}
    }

    return findId
}


export const deleteAds = (id:number) => {
return ads.filter(element => element.id !== id)

}