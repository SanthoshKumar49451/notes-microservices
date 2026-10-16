import { z } from 'zod';




export const registerSchema = z.object({
    name: z.string().min(1, "name is required"),

    email: z.string().email("Valid email is needed"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number, and special character"
        )
});

export const loginSchema = z.object({
    

    email: z.string().email("Valid email is needed"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
       
});


export type RegisterInput=z.infer<typeof registerSchema>



export type LoginInput=z.infer<typeof loginSchema>