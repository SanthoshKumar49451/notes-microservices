import {success, z} from 'zod';
import type { ZodSchema } from 'zod';
import type { Request,Response,NextFunction } from 'express';
import { AppError } from '../../config/errors/appError';

export function validateBody(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("VALIDATION MIDDLEWARE EXECUTED");

        const result = schema.safeParse(req.body);

        if (!result.success) {
            console.log("VALIDATION FAILED:", result.error.issues);

            const message = result.error.issues
                .map(issue => issue.message)
                .join(", ");

            return next(new AppError(400, message, false));
        }

        console.log("VALIDATION PASSED");

        req.body = result.data;
        next();
    };
}


