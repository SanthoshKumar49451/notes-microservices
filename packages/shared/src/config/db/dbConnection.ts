import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();




let pool : Pool|null=null;


export function openPool():Pool{
    const connectionString=process.env.DATABASE_URL; 
    console.log(connectionString)
    if (!pool) {
        if (!connectionString) {
            throw new Error("DATABASE URL NOT SET")
        }
            
        }
        pool=new Pool({
            connectionString:connectionString
        })
        return pool;
    }
    


 export async function closePoll():Promise<void>{
        if (pool) {
            await pool.end();
            pool=null
            
        }
    }


    