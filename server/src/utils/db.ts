import { DataSource } from "typeorm"
import { Ads } from "../entities/Ads"
import { Categories } from "../entities/Categories"
import { Tags } from "../entities/Tags"

export const dsc = new DataSource({
    type: "postgres",
    host: "db",
    port:5432,
    database: "the_good_corner",
    username: 'postgres',
    password: "example",

    entities: ["src/entities/*.ts"],
    synchronize: true,
    migrations: ["migrations/*.ts"],
    migrationsTableName: "migrations",
})

export const clearDB = async () => {
    const connection = dsc.manager.connection;

    await connection.query("SET session_replication_role = 'replica'");

    try {
        await connection.query('TRUNCATE TABLE ad CASCADE');
        await connection.query('TRUNCATE TABLE categories CASCADE');
        await connection.query('TRUNCATE TABLE tags CASCADE');
    } finally {
        await connection.query("SET session_replication_role = 'origin'");
    }
};


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
