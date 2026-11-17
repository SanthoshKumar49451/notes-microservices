import { UserRole } from "shared"




export type RbacRule = {
    method: string,
    roles: UserRole[],
    path: string
}




export const publicRoutes = [
    {
        method: 'POST',
        path: '/api/v1/auth/register',
    },
    {
        method: 'POST',
        path: '/api/v1/auth/login',
    }

]




export const rbacRules: RbacRule[] = [
    {
        method: "GET",
        path: "/api/v1/auth/me",
        roles: ["USER", "ADMIN"]
    }
]



function matchPath(pattern: string, actual: string): boolean {

    if (pattern === actual) {
        return true
    }
    const patternParts = pattern.split("/");
    const actualParts = actual.split("/");

    if (patternParts.length !== actualParts.length) {
        return false;
    }
    return patternParts.every((part, index) => {
        return part.startsWith(":") || part === actualParts[index];
    })

}


function isPublicRoute(method: string, path: string): boolean {
    return publicRoutes.some(route => {
        return route.method === method && matchPath(route.path, path);
    })
}

function getAllowedRoles(method: string, path: string): UserRole[] | null {

    const rule = rbacRules.find(item => item.method === method
        && matchPath(item.path, path)
    )
    return rule?.roles || null


}


export { matchPath, isPublicRoute, getAllowedRoles }