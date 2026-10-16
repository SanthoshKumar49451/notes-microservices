
import {NextFunction, Request,Response} from 'express'
import { AppError } from './appError'



export const errorHandler=(
    error:unknown,
    _req:Request,
    res:Response,
    _next:NextFunction

):any=>{
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success:false,
            message:error.message

        })
    }
    console.error("[ERROR HANDLER] Unhandled error:", error);

    return res.status(500).json({
        success:false,
        message:"Internal server error "


    })
}