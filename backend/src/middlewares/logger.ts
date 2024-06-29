import { Request, Response, NextFunction } from "express"

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(
        `${new Date().toLocaleString()} method "${req.method}" on path "${req.path}"`
    )
    next()
}
