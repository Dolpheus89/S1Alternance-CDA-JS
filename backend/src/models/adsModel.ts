import {ads} from "../utils/fakeDB"
import { db } from '../utils/dbConfig';

export interface Ad {
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    createdAt: string,
  }

  export const getLocationAds = async (location?: string): Promise<Ad[]> => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM ad";
      let params: string[] = [];
  
      if (location) {
        query += " WHERE location = ?";
        params.push(location);        
      }
  
      db.all(query, params, (err: Error | null, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Ad[]);
        }
      });
    });
  };
  
  export const getAveragePrice = async (location?: string): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        
        let query = "SELECT location, AVG(price) FROM ad"
        let params: string[] = [];

        if(location){
            query += " WHERE location = ?"
            params.push(location)
            console.log(query);
        }

            query += " GROUP BY location"

        db.all(query,params,(err:Error | null, rows) => {
            if (err) {
                reject(err);
              } else {
                resolve(rows as number[]);
              }
        })
    })
  }


export const postAds = (title?: string, description?: string,owner?: string,price?: number,picture?: string,location?: string): Promise<void>=> {
    return new Promise((resolve, reject) => {

        const query = "INSERT INTO ad (title,description,owner,price,picture,location,createdAt) values (?,?,?,?,?,?,?)"
        const params = [
            title || "Untitled",
            description || "No description",
            owner || "Unknown",
            price || 0,
            picture || "",
            location || "Unknown",
            new Date().toISOString()
        ]
    
        db.run(query,params,(err:Error | null) => {
            if (err) {
                reject(err);
              } else {
                resolve();
              }
        })
    })
}


export const putAds = (id:number, data: any): Promise<void> => {
    return new Promise((resolve, reject) => {

        let sqlQuery = "UPDATE ad SET "
        const params = []
        const lastkey = Object.keys(data).length -1
        let index = 0

        for (const [key,value] of Object.entries(data)){ 
            
            if (index !== lastkey){
                sqlQuery += `${key} = ?, `
                params.push(value)
            } else {
                sqlQuery += `${key} = ? `
                params.push(value)            
            }
                index++
        }
                sqlQuery += `WHERE id = ?`;
                params.push(id);

        db.run(sqlQuery,params,(err: Error | null) => {
            if (err){
                reject(err)
            } else {
                resolve();
            }
        });
    })
}

export const putAdPriceFromDate = (query: {price:number, date: Date}):Promise<void> => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "UPDATE ad SET price = ? WHERE createdAt LIKE ?"
        const params = [query.price,query.date.toISOString().substring(0,10)+ "%"]

        db.run(sqlQuery,params,(err: Error | null) => {
            if (err){
                reject(err )
            } else {
                resolve()
            }
        })
    })
}


export const deleteAds = (query: {id?:number , price?:number}):Promise<void> => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "DELETE FROM ad WHERE "
        const params :number[]= []

        if(query.id) {
            sqlQuery +="id = ?"
            params.push(query.id)
        } else if (query.price){
            sqlQuery += 'price > ?'
            params.push(query.price)
        } else {
            reject(new Error('Arguments not found.'))
            return
        }

        db.run(sqlQuery,params,(err: Error | null)  => {
            if (err) {
                reject(err);
            } else {
                 resolve()
            }
        })
    })
}