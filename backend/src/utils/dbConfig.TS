import sqlite3 from 'sqlite3'
import { DataSource } from 'typeorm'

sqlite3.verbose()

export const dsc = new DataSource({
    type:"sqlite",
    database: "src/utils/good_corner.sqlite",
    entities: ["src/entities/*.ts"],
})

