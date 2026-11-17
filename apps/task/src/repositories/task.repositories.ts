import { Task } from "../utils/types";
import {openPool} from 'shared'


export async function  createTask(input:{
    title:string,
    createdBy :string

}):Promise<Task|null>{
  
    
const result  =await openPool().query<Task>(
    `
    INSERT INTO tasks(title,created_by)
    VALUES ($1,$2)
    RETURNING  id,title,created_by,created_at,updated_at
    
    `,
    [input.title,input.createdBy]
)
return result.rows[0];
}




//listAdminTasks
//listUserTasks
//manage in all places

export async function listTasks(input:{
    userId:string,
    role:string
}):Promise<Task[]|null>{


    if (input.role==="ADMIN") {
   const result =await openPool().query<Task>(
        `
        SELECT id ,title ,status ,created_by ,created_at,updated_at
        FROM tasks  
        ORDER BY created_at DESC
        
        `
    )
     return result.rows
        
    }
    const result =await openPool().query<Task>(
        `
        SELECT id ,title ,status ,created_by ,created_at,updated_at
        FROM tasks  
        WHERE created_by = $1
        ORDER BY created_at DESC
        
        `,
        [input.userId]
    )

    return result.rows
}




export async function findTaskById (id:string):Promise<Task |null> {


    const result =await openPool().query<Task>(
        `SELECT id ,title ,status,created_by ,created_at,updated_at
        FROM tasks
        WHERE id=$1`,
        [id]
    )
    return result.rows[0];
    
}