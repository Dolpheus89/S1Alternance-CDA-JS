import sqlite3 from 'sqlite3'
import fs from 'node:fs'

sqlite3.verbose()

export const db = new sqlite3.Database('./src/utils/good_corner.sqlite')


export const initDB = () => {

    const sqlContent:string = fs.readFileSync('./src/utils/queries.sql', {encoding:'utf-8'})

    db.exec(sqlContent,(err) => {
        if (err){
            console.log(`fail to load sql query ` + err);
        } else {
            console.log(`sqlContent loaded `);
        }
    })

}
