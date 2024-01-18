import TaskTable from "../ui/tasks/task-table"

export default function Page() {
    return (
        <main className="h-full">
            <TaskTable userId={1}/>
        </main>
    )
}