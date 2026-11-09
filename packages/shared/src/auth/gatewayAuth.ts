import type  {Request,Response,NextFunction} from  'express'
import { AppError } from '../config/errors/appError';




//read     GATEWAY from env 
//compare  to  incoming x-gateway-secret
//match   ---->  next (); missing/mismatch -->403
//


const requireGatewaySecret=(
    req:Request,
    res:Response,
    next:NextFunction
)=>{


    const expected=process.env.GATEWAY_SECRET;

    if (!expected) {
        return  next(new AppError(500,"Gateway-secret not configured",false))
    }

    const incoming=req.header("x-gateway-secret");
    if (!incoming || incoming  !== expected) {
     return next( new AppError(403,"forbidden",false))
        
    }
    next();
}



export {requireGatewaySecret}