import { dsc } from "../utils/db"
import { Categories } from "../entities/Categories"

export const getCategories = async (): Promise<Categories[]> => {
    const category = await dsc.manager.find(Categories)

    if (category.length === 0) {
        throw new Error("no category find")
    } else {
        return category
    }
}
