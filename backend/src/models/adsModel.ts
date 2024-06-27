import { dsc } from "../utils/db";
import { Ads } from "../entities/Ads";
import { Categories } from "../entities/Categories";


  export const getLocationAds = async (location?: string):Promise<Ads[]> => {
        const ads = await dsc.manager.find(Ads, {
          where: {location},
          relations: {category:true}
        })      
 
        if(ads.length === 0){
          throw new Error("no Ads find with this location")
        } else {
          return(ads)
        }
  };
  
  export const getAveragePrice = async (location?: string): Promise<Ads[]> => {
    const queryBuilder = dsc
        .getRepository(Ads)
        .createQueryBuilder("ad")
        .select("ad.location")
        .addSelect("ROUND(AVG(ad.price), 2)", "avgPrice")
        .groupBy("ad.location");

    if (location) {
        queryBuilder.where(`ad.location = :location`, { location: `${location}` });
    }

    const ads = await queryBuilder.getRawMany();

      if(ads.length === 0){
        throw new Error("no Ads find with this location")
      } else {
        return(ads)
      }
  }

  export const getAdsByCategory = async (cat1: string,cat2?: string):Promise<Ads[]> => {
    const queryBuilder= dsc
    .getRepository(Ads)
    .createQueryBuilder("ad")
    .select(["ad.title", "ad.description", "ad.owner", "ad.price", "ad.picture", "ad.location", "cat.name"])
    .innerJoin("ad.category","cat")

    if (cat2) {
      queryBuilder.where('cat.name LIKE :cat1 OR cat.name LIKE :cat2', { cat1: `${cat1}%`,cat2: `${cat2}%` });
    } else {
      queryBuilder.where('cat.name LIKE :cat1', {cat1: `${cat1}%` });
    }
  
    const ads = await queryBuilder.getRawMany();

    if(ads.length === 0){
      throw new Error("no Ads find with this category")
    } else {
      return(ads)
    }

  }

  export const getAvgPriceCategory = async (cat?:string):Promise<Ads[]> => {
      const queryBuilder = dsc
        .getRepository(Ads)
        .createQueryBuilder("ad")
        .select("cat.name")
        .addSelect("ROUND(AVG(ad.price), 2)", "avgPrice")
        .innerJoin("ad.category","cat")
        .groupBy("cat.name");

        if(cat){
          queryBuilder.where('cat.name LIKE :cat', {cat: `${cat}%` });
        }

        const ads = await queryBuilder.getRawMany();

        if(ads.length === 0){
          throw new Error("no Ads find with this category")
        } else {
          return(ads)
        }
  }

  export const postAds = async (
    title?: string,
    description?: string,
    owner?: string,
    price?: number,
    picture?: string,
    location?: string,
    convertedCategory?: number
  ): Promise<Ads> => {
    const adRepository = dsc.getRepository(Ads);

    const newAd = adRepository.create({
      title: title || "Untitled",
      description: description || "No description",
      owner: owner || "Unknown",
      price: price || 0,
      picture: picture || "",
      location: location || "Unknown",
      createdAt: new Date(),
      category: convertedCategory ? { id: convertedCategory } : undefined,
    });
  
    await adRepository.save(newAd);
  
    return newAd;
  };


export const putAds = async (id:number, data: any): Promise<any> => {
  const updateData : { [key: string]: any } = {};
  for (const [key , value] of Object.entries(data)) {
    updateData[key] = value;
  }

  const updatedAd = await dsc.manager.update(Ads, id, updateData)
  
  return updatedAd
}


export const convertCategory = async (category?:string):Promise<number | undefined> => {
  if(!category || typeof category !== 'string'){
    return;
  }
  const categorySrc = dsc.getRepository(Categories)
  try {
    let findCategory = await categorySrc.findOne({where: {name: `${category}`}})

    if(!findCategory){
      const newCategory = categorySrc.create({name: `${category}`})
      const saved = await categorySrc.save(newCategory);
      console.log('New category added');
      findCategory = saved
    }

    return findCategory.id
  } catch (error) {
    return Promise.reject(error);
  }
  
}


export const deleteAds = async (id : number[]):Promise<number> => {
  if (id.length === 1){
    await dsc.manager.delete(Ads,id[0])
  } else {
    await dsc.manager.delete(Ads,id)
  }

  return id.length
}