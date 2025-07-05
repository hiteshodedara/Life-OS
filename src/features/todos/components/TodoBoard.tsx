'use client'

import { mockTodos } from "@/lib/data"
import type { Todo } from "@/lib/types"
import TaskCard from "./TaskCard"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

const columns: { title: string; status: Todo['status'] }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
]

export default function TodoBoard() {
  const [tasks, setTasks] = useState<Todo[]>(mockTodos);

  // In a real app, this would be an API call
  const updateTaskStatus = (taskId: string, newStatus: Todo['status']) => {
    setTasks(currentTasks => 
        currentTasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
        )
    );
  };

  return (
    <div className="w-full md:h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-stretch md:h-full">
            {columns.map(column => (
            <div key={column.status} className="w-full flex flex-col">
                <div className="p-2 rounded-lg bg-muted mb-4">
                    <h2 className="text-lg font-semibold font-headline text-center">{column.title} ({tasks.filter(t => t.status === column.status).length})</h2>
                </div>
                <ScrollArea className="rounded-md md:flex-1">
                    <div className="space-y-4 pr-4">
                        {tasks
                        .filter(task => task.status === column.status)
                        .map(task => (
                            <TaskCard key={task.id} task={task} onStatusChange={updateTaskStatus} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
            ))}
        </div>
    </div>
  )
}
