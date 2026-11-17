import  {config} from 'dotenv';
import { resolve } from 'node:path'
import express from 'express'
import {AppError, httpLogger,sucessResponse,errorHandler, logger} from 'shared'


config({
    path: resolve(process.cwd(), '.env')
})
config({
    path: resolve(process.cwd(), '../../.env')
})


const PORT = process.env.TASK_PORT || 3002 ;

const app=express();


app.use(httpLogger);

app.use(express.json());

app.get('/health',(_req,res)=>{
    sucessResponse(res,{service :"task-service"},)
})



app.use((_req,_res,next)=>{
    next(new AppError(404,"Route not found",false))
});


app.use(errorHandler);


app.listen(PORT,()=>{
    logger.info(`Task service is now running at the ${PORT}`)
});



