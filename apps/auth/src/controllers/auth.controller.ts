import type {Request,Response ,NextFunction } from "express";
import * as authService from '../services/auth.service'
import { AppError, sucessResponse } from "shared";





 async function register(req:Request,res:Response,next:NextFunction){
    try {
        console.log("hello")
        const user=await authService.registerUser(req.body);
        sucessResponse(res,user,201,true)
    } catch (error) {
        console.log(error)
        next(error);
        
    }



}

async function login(req: Request, res: Response, next: NextFunction) {
    

    try {
        const result = await authService.loginUser(req.body);
        return sucessResponse(res, result, 200, true);
    } catch (error) {
        console.error("ACTUAL LOGIN ERROR:", error);
        return next(error);
    }
}


async function getMe(req:Request,res:Response,next:NextFunction){
   try {
     const userId=req.header("x-user-id");
     console.log("hello")
     if (!userId) {
        throw new AppError(401,"Missing x-user-id header",false);  
     }
     const user=await authService.getMe(userId);
        sucessResponse(res,user,200,true)
   } catch (error) {
    
    next(error);
   }
}

export {register,login,getMe};