'use server'

//remember to create a db connection instead of just use sql`` because sql`` opens a connection at each use
//probabbly a good alternative is to create a separated file just to make the connection
//I need to research about this, actually
import { sql } from "@vercel/postgres"
import { task } from "../definitions"

const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()

    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()
    const seconds = date.getSeconds().toString()

    const answer = `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`
    console.log(`Fomatted to ${answer}`)

    return answer
}

//insert
export const insertTask = async ({task}: {task: task}) => {
    const {id, name, description, time, status, userId} = task
    const datetime = formatDate(time)

    try {
        await sql`INSERT INTO Task (id, name, description, time, status, user_id)
                VALUES (${id}, ${name}, ${description}, ${datetime}, ${status}, ${userId})
        `

    } catch (err) {
        console.error('Database error', err)
        throw new Error('Problem inserting task')

    }
}

//select tasks from user
export const getAllTasks = async (userId: number) => {
    try {
        sql`
            SELECT (id, name, description, time, status user_id) FROM Task
                WHERE user_id = ${userId}
        `

    } catch (err) {
        console.error('Database error', err)
        throw new Error('Problem getting tasks from user')
        
    }
}

//delete
export const deleteTaskById = async (id: string) => {
    try {
        await sql`DELETE FROM Task WHERE id=${id}`
        
    } catch(err) {
        console.error('Database error', err)
        throw new Error('Problem deleting task')
    }
}

//update