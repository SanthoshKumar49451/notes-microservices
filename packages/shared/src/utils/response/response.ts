import type {Response} from 'express'


export function sucessResponse(res:Response,data:unknown,statusCode:number=200,success:boolean=true,){
    return res.status(statusCode).json({
        success:true,
        data
    })
}



export function failResponse(res:Response,message:string,statusCode:number=400,success:boolean=false){
    return res.status(statusCode).json({
        success,
        message
    })
}