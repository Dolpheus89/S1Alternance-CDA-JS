import { Query, Resolver, Arg } from "type-graphql"
import { dsc } from "../utils/db"
import { Ads } from "../entities/Ads"
import { Equal, Like } from "typeorm"

@Resolver(Ads)
export class AdsQueries {
    private adsRepository = dsc.getRepository(Ads)

    @Query((type) => [Ads])
    async getAllAds(): Promise<Ads[]> {
        return await this.adsRepository.find()
    }

    @Query((type) => [Ads])
    async getAdById(@Arg("id") id: number): Promise<Ads[]> {
        return await this.adsRepository.findBy({
            id: Equal(id),
        })
    }

    @Query((type) => [Ads])
    async getAdByTitle(@Arg("title") title: string): Promise<Ads[]> {
        return await this.adsRepository.findBy({
            title: Like(`%${title}%`),
        })
    }

    @Query((type) => [Ads])
    async getAdsByCategory(@Arg("name") name: string): Promise<Ads[]> {
        return await this.adsRepository.findBy({
            category: {
                name: Like(`%${name}%`),
            },
        })
    }

    @Query((type) => [Ads])
    async getAdsByTag(@Arg("name") name: string): Promise<Ads[]> {
        return await this.adsRepository.findBy({
            tags: {
                name: Like(`%${name}%`),
            },
        })
    }
}
