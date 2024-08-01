import { DataSource } from "typeorm"

export const dsc = new DataSource({
    type: "postgres",
    host: "db",
    port:5432,
    database: "the_good_corner",
    username: 'the_good_corner_user',
    password: process.env.THEGOODCORNER_DBPASS,

    entities: ["src/entities/*.ts"],
    synchronize: true,
    migrations: ["migrations/*.ts"],
    migrationsTableName: "migrations",
})

