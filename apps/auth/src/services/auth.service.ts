import { AppError } from "shared";
import { createUser, findByEmail, findById } from "../repositories/user.repo";
import { LoginInput, RegisterInput } from "../schemas/auth.schemas";
import bcrypt from "bcryptjs";
import { convertToPublicUser } from "../utils/auth.utils";
import { signToken } from "../utils/jwt";

 async function registerUser(input:RegisterInput){

    const existing=await findByEmail(input.email);
    if (existing) {
        throw new AppError(409,"Email already registered",false)
        
    }
    const passwordHash=await bcrypt.hash(input.password,10);
    const user=await createUser({
        name:input.name,
        email:input.email,
        password_hash:passwordHash,
        role:"USER"
    });
    return convertToPublicUser(user)
}

async function loginUser(input: LoginInput) {
    console.log("1. Login service started");

    const user = await findByEmail(input.email);
    console.log("2. User found:", Boolean(user));

    if (!user) {
        throw new AppError(401, "Invalid email or password", false);
    }

    const valid = await bcrypt.compare(
        input.password,
        user.password_hash
    );
    console.log("3. Password valid:", valid);

    if (!valid) {
        throw new AppError(401, "Invalid email or password", false);
    }

    console.log("4. Generating JWT");

    const token = signToken({
        userId: user.id,
        role: user.role
    });

    console.log("5. JWT generated");

    return {
        token,
        user: convertToPublicUser(user)
    };
}
async function getMe(userId:string){

    const user=await findById(userId);
    if (!user) {
        throw new AppError(404,"User not found",false)
    }
    return convertToPublicUser(user)
}

    export {registerUser,loginUser,getMe}