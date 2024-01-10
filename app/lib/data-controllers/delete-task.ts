'use server'

import { sql } from "@vercel/postgres"

export const deleteTaskById = async (id: string) => {
    try {
        await sql`DELETE FROM Task WHERE id=${id}`
    } catch(err) {

    }
}