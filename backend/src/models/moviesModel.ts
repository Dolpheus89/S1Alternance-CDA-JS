import { csvConverter, readCSVFile, writeOnCSVFile } from "../utils/fakeDB";

export interface Movie {
    ID: number,
    Titre: string,
    Année: number,
    Prix: number,
    Horaires: string[],
}
const header = "ID;Titre;Année;Prix;Horaires";

export const countMovies = async ():Promise<number> => {
    return (await readCSVFile()).length
}

export const getPriceForAll = async ():Promise<number> => {
    return (await readCSVFile()).reduce((total, moviePrice) => total + moviePrice.Prix,0)
}


export const filteredMovie = async(minYear:number | "default", reqTime:string[] | "default"):Promise<Movie[]> => {

    let result : Movie[]= []


    if(minYear !== "default" && reqTime === "default"){
        result = (await readCSVFile()).filter(movie => 
            movie.Année >= minYear )
    } else if (minYear === "default" && reqTime !== "default"){
        result = (await readCSVFile()).filter( movie =>
            movie.Horaires.some((time: string) => reqTime.includes(time)))
    } else if (minYear !== "default" && reqTime !== "default"){
        result = (await readCSVFile()).filter(movie =>
            movie.Année >= minYear
            &&
            movie.Horaires.some((time: string) => reqTime.includes(time)))
    } else {
        result = await readCSVFile()
    }
    

    return result
}

export const addMovie = async (Titre: string, Année: number, Prix: number, Horaires: string[]): Promise<Movie> => {
    const movies = await readCSVFile();

    const newMovie: Movie = {
        ID: movies.length > 0 ? movies[movies.length - 1].ID + 1 : 1,
        Titre: Titre || "undefined",
        Année: Année || 0,
        Prix: Prix || 0,
        Horaires: Horaires || ["undefined"],
    };

    movies.push(newMovie);

    const csvData = csvConverter(movies,header)

    await writeOnCSVFile(csvData);

    
    return newMovie;
};

export const putMovie = async (
    ID: number,
    Titre: string,
    Année: number, 
    Prix: number, 
    Horaires: string[]): Promise<Movie[]> => {

    const movies = await readCSVFile()
    const findID = movies.filter((element) => element.ID === ID)

    if(findID.length === 1){

        for (let element in findID){
            if (Titre !== undefined){ findID[element].Titre = Titre}
            if (Année !== undefined){ findID[element].Année = Année}
            if (Prix !== undefined){ findID[element].Prix = Prix}
            if (Horaires !== undefined){ findID[element].Horaires = Horaires}
        }

        const csvData = csvConverter(movies, header)
        await writeOnCSVFile(csvData);
    
        return findID
    }

    return []
}


export const deleteMovie = async(ids:number[]):Promise<Movie[]>=> {
    const movies = await readCSVFile()
    let deletedID:Movie[] = []

    if (ids.length !== 0) {
        for (const id of ids){
            movies.filter((element,index) => {
                if(element.ID === id){
                    deletedID.push(element)
                    movies.splice(index,1)
                }
            })
        }

    const csvData = csvConverter(movies, header)
    await writeOnCSVFile(csvData);
    console.log(deletedID);
    
    return deletedID

    }

    return []
}
   