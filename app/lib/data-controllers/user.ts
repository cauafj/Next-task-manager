'use server'

import { user } from "../definitions"
import { sql } from "@vercel/postgres"
import bcrypt from 'bcrypt'

//insert
export const insertUser = async(user: user) => {
    const {username, password, id} = user
    const encryptedPassword = await bcrypt.hash(password, 10)

    try {
        await sql`
            INSERT INTO USER (username, password, id)
                VALUES (${username}, ${encryptedPassword}, ${id})
        `

    } catch (err) {
        console.error('Database error', err)
        throw new Error('Problem inserting task')
        
    }
}

//update

//delete

