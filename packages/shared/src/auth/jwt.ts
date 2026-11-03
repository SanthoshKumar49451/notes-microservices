import  jwt  from "jsonwebtoken";
import { AuthTokenPayload } from "../auth/type";




const extractSecret=():string=>{
    const secret=process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT SECRET IS NOT SET")
    }
    return secret
}


const signToken=(payload:AuthTokenPayload):string=>{
   const expiresIn=process.env.JWT_EXPIRES_IN;
   const token=jwt.sign(payload,extractSecret(),{
    expiresIn:expiresIn as jwt.SignOptions["expiresIn"],
   });
   return token as string
}


const verifyToken=(token:string):AuthTokenPayload=>{
    const decodeToken=jwt.verify(token,extractSecret());

    if (typeof decodeToken !== 'object' || decodeToken==null ||typeof decodeToken.) {
        
    }
 
    return {
        userId: decodeToken.userId,
        role: decodeToken.role
    };
}