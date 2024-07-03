import { Query, Resolver, Arg } from "type-graphql"
import { dsc } from "../utils/db"
import { Categories } from "../entities/Categories"

@Resolver(Categories)
export class CategoriesQueries {
    private categoriesRepository = dsc.getRepository(Categories)

    @Query((type) => [Categories])
    async getAllCategories(): Promise<Categories[]> {
        return await this.categoriesRepository.find()
    }
}
