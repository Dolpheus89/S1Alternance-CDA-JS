import sqlite3 from "sqlite3"
import { DataSource } from "typeorm"
import { Ads } from "../entities/Ads"
import { Categories } from "../entities/Categories"
import { Tags } from "../entities/Tags"

sqlite3.verbose()

export const dsc = new DataSource({
    type: "sqlite",
    database: "src/utils/good_corner.sqlite",
    entities: ["src/entities/*.ts"],
    synchronize: false,
    migrations: ["migrations/*.ts"],
    migrationsTableName: "migrations",
})

export const clearDB = async () => {
    await dsc.manager.clear(Ads)
    await dsc.manager.clear(Categories)
    await dsc.manager.clear(Tags)
}

export const createAndPersistAd = async (
    title: string,
    owner: string,
    category: Categories,
    tags: Tags[],
    picture: string
) => {
    const ad = new Ads(title, owner)
    ad.tags = tags
    ad.picture = picture
    ad.category = category

    await dsc.manager.save(ad)
}
export const initData = async () => {
    try {
        const tag1 = new Tags("Vieux matériel")
        const tag2 = new Tags("Bonne affaire")
        const tag3 = new Tags("0 carbone")

        await dsc.manager.save([tag1, tag2, tag3])

        const category1 = new Categories("Meubles")
        const category2 = new Categories("Locomotion")
        const category3 = new Categories("Autres")

        await dsc.manager.save([category1, category2, category3])

        await createAndPersistAd(
            "Armoire normande",
            "Louis",
            category1,
            [tag1, tag3],
            "/images/vaisselier.webp"
        )
        await createAndPersistAd(
            "Rollers",
            "Mireille",
            category2,
            [tag2],
            "/images/roller.jpg"
        )
        await createAndPersistAd(
            "Table de jardin",
            "Benoit",
            category1,
            [tag3],
            "/images/table.webp"
        )

        console.log("Initialisation des données terminée.")
    } catch (error) {
        console.error("Erreur lors de l'initialisation des données :", error)
    }
}
