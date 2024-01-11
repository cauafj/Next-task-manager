export enum Status {
    notStaterd = 'Not started',
    doing = 'Doing',
    done = 'Done',
    notDone = 'Not done'
}

export type user = {
    username: string,
    password: string,
    id: string
}

export type task = {
    id: string,
    name: string,
    description: string,
    time: Date,
    status: Status,
    userId: string
}