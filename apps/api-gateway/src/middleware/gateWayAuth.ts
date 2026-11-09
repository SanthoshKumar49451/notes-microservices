import type  {Request,Response,NextFunction} from 'express'
import { AppError, verifyToken } from 'shared';
import { getAllowedRoles, isPublicRoute } from '../rbac';


//main middleware
//Run  on every /auth request before the proxy  forward to the auth service 

const IDENTITY_HEADERS=[
    "x-user-id",
    "x-user-role",
    "x-gateway-secret"

] as const;


function stripIdentityHeaders(req:Request){
    for(const header of IDENTITY_HEADERS){
        delete req.headers[header]
    }
}


//proves request comes throw the api gateway

function attachGatewaySecert(req:Request){
    const secret=process.env.GATEWAY_SECRET;

    if (secret) {
        throw new AppError(500,"GATEWAY SECRET NOT CONFIGURED",false);
        
    }
    req.headers["x-gateway-secret"]=secret;
}


function requestPath(req:Request){
    const combine=`${req.baseUrl}${req.path}`;
    if (combine.length>1 && combine.endsWith("/")) {
        return combine.slice(0,1)
    }
    return combine || "/" ;
}

function attachUserHeaders(req:Request,userId:string,role:string){
    req.headers["x-user-id"]=userId;
    req.headers["x-user-role"]=role;

}

export function  gatewayAuth(req:Request,_res:Response,next:NextFunction){


  try {
      //stripr or remove the identity headers 
    stripIdentityHeaders(req);
    attachGatewaySecert(req);

    const path=requestPath(req);
    if(isPublicRoute(req.method,path)){
       next();
    }
    const authHeader=req.header('authorization');
    if (!authHeader?.startsWith("Bearer ")) {
        throw new AppError(401,"missing or invalid auth token",false);
        
    }
    const token =authHeader.slice("Bearer ".length).trim();
    const payload=verifyToken(token);
    //RBAC -> check the role access
    const getAllowedRole=getAllowedRoles(req.method,path);
    if (!getAllowedRole) {
        throw new AppError(404, "Route not found",false);

        
    }

    //forbidden
    if (!getAllowedRole.includes(payload.role)) {
        throw new AppError(403,"Forbidden do not have access",false)
    }

    attachUserHeaders(req,payload.userId,payload.role);
    next();
  } catch (error) {
    if (error instanceof AppError) {
        return next(error)
    }

  }
  return next(new AppError(401,"Invalid token or expired",false))

}