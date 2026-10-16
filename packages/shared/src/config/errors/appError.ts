export class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational?: boolean;
    readonly success: boolean;

    constructor(
        statusCode: number,
        message: string,
        success: boolean,
        isOperational?: boolean
    ) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.success = success;
        this.isOperational = isOperational;
    }
}