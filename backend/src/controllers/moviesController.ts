import { Request, Response } from 'express';
import * as moviesModel from "../models/moviesModel"

export const getAllCount =async (req:Request,res:Response) => {
    try {
        const movies = await moviesModel.countMovies()
        res.json(movies)
    } catch(err) {
        res.status(500).json({message: "Failed to count movies"})
    }
}

export const getAllPrice =async (req:Request,res:Response) => {
    try {
        const movies = await moviesModel.getPriceForAll()
        res.json(movies)
    } catch(err) {
        res.status(500).json({message: "Failed to count prices"})
    }
}

export const getFilteredMovie = async (req:Request, res:Response) => {
    const minYearQuery = req.query.minYear as string
    const reqTimeQuery = req.query.reqTime as string

    const minYear: number | "default" = minYearQuery ? parseInt(minYearQuery): "default"
    const reqTime: string[] | "default" = reqTimeQuery ? reqTimeQuery.split(',')  : "default"

    try {
        const movies = await moviesModel.filteredMovie(minYear,reqTime)
        res.json(movies)
    } catch(err){
        res.status(500).json({message: "Failed to filter movies"})
    }
    
}

export const postMovie = async (req:Request, res:Response)=> {
    try {
        const { Titre,Année,Prix, Horaires, } = req.body
        const newMovie = await moviesModel.addMovie(Titre,Année,Prix,Horaires)
        res.status(201).json(newMovie);
    } catch(err){
        res.status(500).json({message: "Failed to add movie"})
    }
    }