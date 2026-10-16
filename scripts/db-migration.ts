import { config } from "dotenv";
import { readFileSync } from "node:fs";
import {resolve} from 'node:path'
import {closePoll, logger, openPool} from 'shared'



config({
    path:resolve(process.cwd(),'.env')
})

async function  dbMigrate(){
   try {
     const file=process.argv[2]??"sql/001_users.sql";
    const  sql=readFileSync(resolve(process.cwd(),file),'utf-8');



    const pool=openPool();
    await pool.query(sql);
    console.log(`MKIgrated ${file}`);
    await closePoll();
   } catch (error) {
    logger.info(`migrate error ${error}`);
    process.exit(1);
   }

}


dbMigrate();