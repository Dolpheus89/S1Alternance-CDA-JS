import { dsc } from "../utils/db"
import { Ads } from "../entities/Ads"
import { Tags } from "../entities/Tags"
import { Categories } from "../entities/Categories"

export const getLocationAds = async (location?: string): Promise<Ads[]> => {
    const ads = await dsc.manager.find(Ads, {
        where: { location },
        relations: { category: true },
    })

    if (ads.length === 0) {
        throw new Error("no Ads find with this location")
    } else {
        return ads
    }
}

export const getAdsByTags = async (tags: string): Promise<Ads[]> => {
    const queryBuilder = dsc
        .getRepository(Ads)
        .createQueryBuilder("ad")
        .select([
            "ad.title",
            "ad.description",
            "ad.owner",
            "ad.price",
            "ad.picture",
            "ad.location",
            "tag.name",
        ])
        .innerJoin("ad.tags", "tag")
        .where("tag.name LIKE :tag", { tag: `${tags}%` })

    const ads = await queryBuilder.getRawMany()

    if (ads.length === 0) {
        throw new Error("no Ads find with this tag")
    } else {
        return ads
    }
}

export const getAveragePrice = async (location?: string): Promise<Ads[]> => {
    const queryBuilder = dsc
        .getRepository(Ads)
        .createQueryBuilder("ad")
        .select("ad.location")
        .addSelect("ROUND(AVG(ad.price), 2)", "avgPrice")
        .groupBy("ad.location")

    if (location) {
        queryBuilder.where(`ad.location = :location`, {
            location: `${location}`,
        })
    }

    const ads = await queryBuilder.getRawMany()

    if (ads.length === 0) {
        throw new Error("no Ads find with this location")
    } else {
        return ads
    }
}

export const getAdsByCategory = async (
    cat1: string,
    cat2?: string
): Promise<Ads[]> => {
    const queryBuilder = dsc
        .getRepository(Ads)
        .createQueryBuilder("ad")
        .select([
            "ad.title",
            "ad.description",
            "ad.owner",
            "ad.price",
            "ad.picture",
            "ad.location",
            "cat.name",
        ])
        .innerJoin("ad.category", "cat")

    if (cat2) {
        queryBuilder.where("cat.name LIKE :cat1 OR cat.name LIKE :cat2", {
            cat1: `${cat1}%`,
            cat2: `${cat2}%`,
        })
    } else {
        queryBuilder.where("cat.name LIKE :cat1", { cat1: `${cat1}%` })
    }

    const ads = await queryBuilder.getRawMany()

    if (ads.length === 0) {
        throw new Error("no Ads find with this category")
    } else {
        return ads
    }
}

export const getAvgPriceCategory = async (cat?: string): Promise<Ads[]> => {
    const queryBuilder = dsc
        .getRepository(Ads)
        .createQueryBuilder("ad")
        .select("cat.name")
        .addSelect("ROUND(AVG(ad.price), 2)", "avgPrice")
        .innerJoin("ad.category", "cat")
        .groupBy("cat.name")

    if (cat) {
        queryBuilder.where("cat.name LIKE :cat", { cat: `${cat}%` })
    }

    const ads = await queryBuilder.getRawMany()

    if (ads.length === 0) {
        throw new Error("no Ads find with this category")
    } else {
        return ads
    }
}

export const postAds = async (
    title: string,
    owner: string,
    checkedCategory: Categories,
    description?: string,
    price?: number,
    picture?: string,
    location?: string,
    checkedTags?: Tags[]
): Promise<Ads> => {
    const adRepository = dsc.getRepository(Ads)

    const newAd = new Ads(
        title || "Untitled",
        owner || "Unknown",
        checkedCategory
    )

    newAd.description = description || "No description"
    newAd.price = price || 0
    newAd.picture = picture || ""
    newAd.location = location || "Unknown"
    newAd.createdAt = new Date()
    newAd.tags = checkedTags || []

    await adRepository.save(newAd)

    return newAd
}

export const putAds = async (
    id: number,
    data: any
): Promise<Ads | undefined> => {
    const adRepository = dsc.getRepository(Ads)

    try {
        const adToUpdate = await adRepository.findOne({
            where: { id },
            relations: ["category", "tags"],
        })

        if (!adToUpdate) {
            throw new Error(`Ad with id ${id} not found`)
        }

        if (data.title) adToUpdate.title = data.title
        if (data.description) adToUpdate.description = data.description
        if (data.owner) adToUpdate.owner = data.owner
        if (data.price !== undefined) adToUpdate.price = data.price
        if (data.picture) adToUpdate.picture = data.picture
        if (data.location) adToUpdate.location = data.location
        if (data.createdAt) adToUpdate.createdAt = new Date(data.createdAt)

        if (data.category) {
            adToUpdate.category = data.category
        }

        if (data.tags) {
            adToUpdate.tags = data.tags
        }

        const updatedAd = await adRepository.save(adToUpdate)
        return updatedAd
    } catch (error) {
        throw new Error(`Failed to update ad: ${error}`)
    }
}

export const checkCategory = async (category?: string): Promise<Categories> => {
    if (!category || typeof category !== "string") {
        throw new Error("Category is required")
    }
    const categorySrc = dsc.getRepository(Categories)
    try {
        let findCategory = await categorySrc.findOne({
            where: { name: `${category}` },
        })

        if (!findCategory) {
            const newCategory = categorySrc.create({ name: `${category}` })
            const saved = await categorySrc.save(newCategory)
            console.log("New category added")
            findCategory = saved
        }

        return findCategory
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteAds = async (id: number[]): Promise<number> => {
    if (id.length === 1) {
        await dsc.manager.delete(Ads, id[0])
    } else {
        await dsc.manager.delete(Ads, id)
    }

    return id.length
}
