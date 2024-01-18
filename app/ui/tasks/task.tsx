import { task } from "@/app/lib/definitions"

//this will need some <Suspense>
const Task = async ({task}: {task: task}) => {
    return (
        <div>{task.name}</div>
    )
}

export default Task