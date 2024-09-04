import { DataSource } from "typeorm"

export const dsc = new DataSource({
    type: "postgres",
    host: "db",
    port:5432,
    database: "the_good_corner",
    username: process.env.THEGOODCORNER_DBUSER,
    password: process.env.THEGOODCORNER_DBPASS,

    entities: ["src/entities/*.ts"],
    synchronize: true,
    migrations: ["migrations/*.ts"],
    migrationsTableName: "migrations",
})
