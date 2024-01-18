export type link = {
    text: string,
    href: string
}

export type user = {
    username: string,
    password: string,
    id: number
}

export type task = {
    id: number,
    name: string | null,
    description: string | null,
    datetime: Date | null,
    status: 'notStarted' | 'done' | 'notDone' | 'doing' | null,
    userId: number
}