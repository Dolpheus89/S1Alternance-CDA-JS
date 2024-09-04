import {
    Query,
    Resolver,
    Arg,
    FieldResolver,
    Root,
    Mutation,
    Authorized,
} from "type-graphql"
import { dsc } from "../utils/db"
import { Ads } from "../entities/Ads"
import { AdsInput } from "../entities/InputType/AdsMutation"
import { Equal, In, Like } from "typeorm"
import DataLoader from "dataloader"
import { Tags } from "../entities/Tags"
import { Categories } from "../entities/Categories"

const tagsDataLoader = new DataLoader((ids) => {
    return dsc.getRepository(Tags).findBy({
        id: In(ids),
    })
})

@Resolver(Ads)
export class AdsResolvers {
    @FieldResolver()
    async tags(@Root() ad: Ads): Promise<Tags[]> {
        if (ad.tagsIds == null || ad.tagsIds.length == 0) {
            return []
        }

        return tagsDataLoader.loadMany(ad.tagsIds)
    }

    private adsRepository = dsc.getRepository(Ads)
    private catRepository = dsc.getRepository(Categories)

    @Authorized("ADMIN", "USER")
    @Query((type) => [Ads])
    async getAllAds(): Promise<Ads[]> {
        return (await this.adsRepository.find()) || []
    }

    @Query((type) => Ads, { nullable: true })
    async getAdById(@Arg("id") id: number): Promise<Ads | null> {
        return (
            (await this.adsRepository.findOneBy({
                id: Equal(id),
            })) || null
        )
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

    @Mutation((type) => Ads, { nullable: true })
    async AddAd(@Arg("adData") adData: AdsInput): Promise<Ads> {
        let category: Categories | null = null

        if (adData.category.name) {
            category = await this.catRepository.findOneBy({
                name: Equal(adData.category.name),
            })

            if (category === null) {
                category = new Categories(adData.category.name)
                await this.catRepository.save(category)
            }
        }

        if (category == null) {
            throw new Error(
                "missing category - params were " +
                    JSON.stringify(adData.category)
            )
        }

        try {
            const ad = new Ads(
                adData.title,
                adData.description,
                adData.owner,
                adData.price,
                adData.picture,
                adData.location
            )

            if (category) {
                ad.category = category
            }

            await this.adsRepository.save(ad)

            return ad
        } catch (e) {
            console.error("create ad failed", e)
            throw new Error("cannot create ad - " + e)
        }
    }

    @Mutation(() => Boolean)
    async deleteAd(@Arg("id") id: number): Promise<boolean> {
        const ad = await this.adsRepository.findOneBy({
            id: Equal(id),
        })

        if (!ad) {
            return false
        }
        await this.adsRepository.remove(ad)
        return true
    }
}
