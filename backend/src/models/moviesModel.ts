import { readCSVFile, writeOnCSVFile } from "../utils/fakeDB";

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

export const addMovie = async (Titre: string, Année: number, Prix: number, Horaires: string[]): Promise<Movie> => {
    const movies = await fetchMovies();

    const newMovie: Movie = {
        ID: movies.length > 0 ? movies[movies.length - 1].ID + 1 : 1,
        Titre: Titre || "undefined",
        Année: Année || 0,
        Prix: Prix || 0,
        Horaires: Horaires || ["undefined"],
    };

    movies.push(newMovie);

    const header = "ID;Titre;Année;Prix;Horaires";
    const data = movies.map(movie =>
        `${movie.ID};${movie.Titre};${movie.Année};${movie.Prix};${movie.Horaires.join(',')}`
    ).join('\n');
    const csvData = `${header}\n${data}`;

    await writeOnCSVFile(csvData);

    console.log("Movies after writing to CSV:", movies);
    
    return newMovie;
};


