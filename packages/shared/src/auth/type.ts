export type UserRole ="USER"|"ADMIN";



export type AuthTokenPayload = {
    userId:string,
    role:UserRole
}