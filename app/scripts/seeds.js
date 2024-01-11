import { db } from "@vercel/postgres";
import { data } from "../lib/placeholder-data";
import bcrypt from 'bcrypt'

//create users
const createUsers =  async (client) => {
    let insertSqlValues
    const lastIndex = array.length - 1

    for (user of data.tasks) {
        const encryptedPassword = bcrypt.hash(user.password, 10)
        const index = data.tasks.indexOf(user)

        insertSqlValues += ` (${user.id}, ${user.username}, ${encryptedPassword})`
        
        if(index !== lastIndex) insertSqlValues += ',' 
    }

    try {
        await client.sql`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE IF NOT EXISTS user (
                id UUID DEFAULT uuid_generate_v4(),
                username VARCHAR(100) NOT NULL UNIQUE,
                password TEXT NOT NULL,

                CONSTRAINT "user_pk" PRIMARY KEY (id)
            );
            INSERT INTO user (id, username, password)
                 VALUES ${insertSqlValues}
                    ON CONFLICT (id) DO NOTHING;
        `

        console.log('Users table created and populated')

    } catch (err) {
        console.error('Database error', err)
        throw new Error('Problem creating users table')

    }
}

//create tasks
const createTasks = async (client) => {
    let insertSqlValues
    const lastIndex = array.length - 1

    for (task of data.tasks) {
        const index = data.tasks.indexOf(task)

        insertSqlValues += ` (${task.id}, ${task.name}, ${task.description}, ${task.time}, ${task.status}, ${task.userId})`
        
        if(index !== lastIndex) insertSqlValues += ','
            
    }

    try {
        await client.sql`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE IF NOT EXISTS task (
                id UUID DEFAULT uuid_generate_v4(),
                name VARCHAR(100),
                description TEXT,
                time DATETIME,
                status ENUM ('Not started', 'Doing', 'Done', 'Not done'),
                user_id UUID NOT NULL,

                CONSTRAINT "task_pk" PRIMARY KEY (id)
                CONSTRAINT "user_fk" FOREIGN KEY (user_id)
                    REFERENCES user (id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );
            INSERT INTO task (id, name, description, time, status, user_id)
                 VALUES ${insertSqlValues}
                    ON CONFLICT (id) DO NOTHING;
        `


    } catch (err) {
        console.error('Database error', err)
        throw new Error('Problem creating tasks table')
        
    }
}

const runSeeds = async () => {
    const client = await db.connect()

    await createUsers(client)
    await createTasks(client)

    await client.end()
}

runSeeds()

