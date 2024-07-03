import { Query, Resolver } from "type-graphql";
import { dsc } from "../utils/db"
import { Ads } from "../entities/Ads";


@Resolver(Ads)
export class AdsResolvers {

    private adsRepository = dsc.getRepository(Ads);

    @Query(type => [Ads])
    async getAllAds(): Promise<Ads[]>{
        return await this.adsRepository.find();
    }

}