import Task from "./task"
import { PrismaClient } from "@prisma/client"

//research about no-store in cache to make this dynamic
const TaskTable = async ({userId}: {userId: number}) => {

    const prisma = new PrismaClient()
    const tasks = await prisma.task.findMany({
        where: {
            userId: userId
        }
    })

    return (
        <div>
            {tasks.map(task => (
               <Task key={task.name} task={task}/> 
            ))}
        </div>
    )
}

export default TaskTable