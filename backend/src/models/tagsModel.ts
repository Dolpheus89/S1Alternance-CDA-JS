import { dsc } from "../utils/db"
import { Tags } from "../entities/Tags"

export const getTagsByName = async (name?: string): Promise<Tags[]> => {
    const queryBuilder = dsc
        .getRepository(Tags)
        .createQueryBuilder("tags")
        .select("tags.name")

    if (name) {
        queryBuilder.where(`tags.name LIKE :name`, { name: `${name}%` })
    }

    const tags = await queryBuilder.getRawMany()

    if (tags.length === 0) {
        throw new Error("no tags find with this location")
    } else {
        return tags
    }
}

export const checkTags = async (tags?: string): Promise<Tags[] | undefined> => {
    if (!tags || typeof tags !== "string") {
        return
    }
    const tagsSrc = dsc.getRepository(Tags)
    let result: Tags[] = []

    const checkThis = tags.split(",").map((tag) => tag.trim())

    for (const tag of checkThis) {
        let findTags = await tagsSrc.findOne({ where: { name: `${tag}` } })

        if (!findTags) {
            const newTags = tagsSrc.create({ name: `${tag}` })
            const saved = await tagsSrc.save(newTags)
            console.log("New tag added")
            findTags = saved
        }

        result.push(findTags)
    }

    return result
}

export const deleteTags = async (id: number[]): Promise<number> => {
    if (id.length === 1) {
        await dsc.manager.delete(Tags, id[0])
    } else {
        await dsc.manager.delete(Tags, id)
    }

    return id.length
}
