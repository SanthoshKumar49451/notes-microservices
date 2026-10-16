import { config } from "dotenv";
import type { Express } from "express";
import express from 'express'
import { resolve } from 'node:path'
import { AppError, errorHandler, httpLogger, logger, sucessResponse } from 'shared'
import { authRouter } from "./routes/auth.routes";





config({
    path: resolve(process.cwd(), '.env')
})
config({
    path: resolve(process.cwd(), '../../.env')
})


const PORT = process.env.AUTH_PORT
console.log("AUTH_PORT", PORT);


const app: Express = express();


app.use(httpLogger);
app.use(express.json());


app.get('/health', (req, res) => {
    sucessResponse(res, { service: "auth-service" })

});

app.use('/api/v1/auth', authRouter)


app.use((_req, res, next) => {
    next(new AppError(404, "Route not found", false))
});

app.use(errorHandler);






app.listen(PORT, () => {
    logger.info(`Auth service is running at http://localhost:${PORT}`)
})






