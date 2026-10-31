import {config} from 'dotenv';
import {resolve}from 'node:path';
import express from 'express';
import type {Express} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit'
import {httpLogger,sucessResponse,AppError,errorHandler, logger} from 'shared';
import {createProxyMiddleware} from 'http-proxy-middleware';


config({
    path : resolve(process.cwd(),".env")
});

config({
    path : resolve(process.cwd(),"../../.env")
});


const PORT=process.env.PORT || 3000;
const  AUTH_SERVICE_URL=process.env.AUTH_SERVICE_URL || "http://localhost:3001";

const rateLimiter=rateLimit({
    windowMs: 15 * 60 * 1000,// 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	
});
const proxy=createProxyMiddleware({
 target:AUTH_SERVICE_URL,
 changeOrigin:true,
 pathRewrite:path=>`/auth${path}`,
})


const app:Express=express();
//secure default headers
app.use(helmet());
//cors 
app.use(cors());
//rate limiter
app.use(rateLimiter);
//parse json request body
app.use(express.json());
//logger
app.use(httpLogger);
//health
app.get('/health',(req,res)=>{
    sucessResponse(res,{service:"API gateway up and running"},200,true)
})


//proxy routes
//add auth proxy route ->3000/auth

app.use('auth',proxy);

app.use((_req,_res,next)=>{
     throw new AppError(404,"Route not found",false)
})

app.use(errorHandler);


app.listen(PORT,()=>{
    logger.info(`api gateway is running on port http://localhost:${PORT}`);
    console.log(`api gateway is running on port http://localhost:${PORT}`);
})