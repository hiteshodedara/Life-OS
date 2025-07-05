'use client'

import type { Todo } from "@/lib/types"
import TaskCard from "./TaskCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const columns: { title: string; status: Todo['status'] }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
]

type TodoBoardProps = {
    tasks: Todo[];
    onEditTask: (task: Todo) => void;
    onDeleteTask: (taskId: string) => void;
    onAddTask: (status: Todo['status']) => void;
}

export default function TodoBoard({ tasks, onEditTask, onDeleteTask, onAddTask }: TodoBoardProps) {
  return (
    <div className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start md:h-full">
            {columns.map(column => (
            <div key={column.status} className="w-full flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
                    <h2 className="text-lg font-semibold font-headline text-center flex-1">{column.title} ({tasks.filter(t => t.status === column.status).length})</h2>
                </div>
                <ScrollArea className="flex-1 -mt-2">
                    <div className="space-y-4 pr-4 pb-4">
                        {tasks
                        .filter(task => task.status === column.status)
                        .map(task => (
                            <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
                        ))}
                    </div>
                </ScrollArea>
                <Button variant="outline" className="w-full" onClick={() => onAddTask(column.status)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </div>
            ))}
        </div>
    </div>
  )
}
