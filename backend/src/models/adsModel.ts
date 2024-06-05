import { db } from '../utils/dbConfig';

export interface Ad {
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    createdAt: string,
    category_id:number
  }

  interface Category {
    id: number;
    name: string;
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

  export const getAdsByCategory = async (cat1: string,cat2?: string):Promise<any[]> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT title, description, owner, price, picture, location, cat.name AS category_name
        FROM ad
        INNER JOIN categories AS cat ON cat.id = ad.category_id
        WHERE cat.name LIKE ?
        `
        const params = [`${cat1}%`]

            if (cat2){
                params.push(`${cat2}%`)
                query += ` OR cat.name LIKE ?`
            }

            db.all(query,params,(err:Error | null, rows) => {
                if (err) {
                    reject(err);
                  } else {
                    resolve(rows);
                  }
            })     
    })
  }

  export const getAvgPriceCategory = async (cat?:string):Promise<any[]> => {
    return new Promise((resolve,reject) => {
        let query = `SELECT cat.name, ROUND(AVG(price), 2) AS AVG_price FROM ad INNER JOIN categories AS cat ON cat.id = ad.category_id WHERE cat.name LIKE ? GROUP BY cat.name`
        let params:string[] = [`%`]
        
        if(cat){params = [`${cat}%`]}
       
        db.all(query,params,(err:Error | null, rows) => {
            if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
        })     
    })
  }

export const postAds = (title?: string, description?: string,owner?: string,price?: number,picture?: string,location?: string,convertedCategory?:number): Promise<void>=> {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO ad (title,description,owner,price,picture,location,createdAt,category_id) values (?,?,?,?,?,?,?,?)"
        const params = [
            title || "Untitled",
            description || "No description",
            owner || "Unknown",
            price,
            picture || "",
            location || "Unknown",
            new Date().toISOString(),
            convertedCategory || 3
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

export const convertCategory = (category?:string):Promise<number> => {
    return new Promise((resolve,reject) => {
        if(!category){
            return
        }
        db.all("SELECT * FROM categories",(err:Error | null,rows: Category[]) => {
            const findCategory = rows.find(row => row.name === category);
            if (!findCategory){
                db.run("INSERT INTO categories (name) values (?)",category,(err:Error | null) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`new category added`);
                        db.get("SELECT last_insert_rowid() as id", (err: Error | null, row: { id: number }) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(row.id);
                            }
                        })
                    }
                })
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