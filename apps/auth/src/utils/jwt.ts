import { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.types";



  

const extractSecret=():string=>{
    const secret=process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT SECRET IS NOT SET")
    }
    return secret
}


const signToken=(payload:JWTPayload):string=>{
   const expiresIn=process.env.JWT_EXPIRES_IN;
   const token=jwt.sign(payload,extractSecret(),{
    expiresIn:expiresIn as jwt.SignOptions["expiresIn"],
   });
   return token as string
}




export {signToken}