import { readCSVFile } from "../utils/fakeDB";

export interface Movie {
    ID: number,
    Titre: string,
    Année: number,
    Prix: number,
    Horaires: string[],
}

const fetchMovies = async():Promise<Movie[]> => {
    return await readCSVFile()
}


export const countMovies = async ():Promise<number> => {
    return (await fetchMovies()).length
}

export const getPriceForAll = async ():Promise<number> => {
    return (await fetchMovies()).reduce((total, moviePrice) => total + moviePrice.Prix,0)
}


export const filteredMovie = async(minYear:number | "default", reqTime:string[] | "default"):Promise<Movie[]> => {

    let result : Movie[]= []


    if(minYear !== "default" && reqTime === "default"){
        result = (await fetchMovies()).filter(movie => 
            movie.Année >= minYear )
    } else if (minYear === "default" && reqTime !== "default"){
        result = (await fetchMovies()).filter( movie =>
            movie.Horaires.some(time => reqTime.includes(time)))
    } else if (minYear !== "default" && reqTime !== "default"){
        result = (await fetchMovies()).filter(movie =>
            movie.Année >= minYear
            &&
            movie.Horaires.some(time => reqTime.includes(time)))
    } else {
        result = await fetchMovies()
    }
    

    return result
}


