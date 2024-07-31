import { Query, Resolver, Arg } from "type-graphql"
import { dsc } from "../utils/db"
import { Equal } from "typeorm"
import { Tags } from "../entities/Tags"

@Resolver(Tags)
export class TagsResolvers {
    private tagsRepository = dsc.getRepository(Tags)

    @Query((type) => [Tags])
    async getAllTags(): Promise<Tags[]> {
        return await this.tagsRepository.find()
    }

    @Query((type) => [Tags])
    async getTagById(@Arg("id") id: number): Promise<Tags[]> {
        return await this.tagsRepository.findBy({
            id: Equal(id),
        })
    }
}
