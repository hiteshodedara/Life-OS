'use client'

import { useState, useEffect } from "react"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TodoBoard from "@/features/todos/components/TodoBoard"
import AddTaskDialog from "@/features/todos/components/AddTaskDialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { getTodos, addTodo, updateTodo, deleteTodo } from "@/services/todoService"
import type { Todo } from "@/lib/types"

export default function TodosPage() {
  const [tasks, setTasks] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null)
  const [initialStatus, setInitialStatus] = useState<Todo['status'] | undefined>(undefined)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const fetchedTasks = await getTodos()
        setTasks(fetchedTasks)
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to load tasks." })
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [toast])

  const handleOpenDialogForAdd = (status: Todo['status']) => {
    setSelectedTask(null)
    setInitialStatus(status)
    setIsDialogOpen(true)
  }
  
  const handleOpenDialogForUpdate = (task: Todo) => {
    setSelectedTask(task)
    setInitialStatus(undefined)
    setIsDialogOpen(true)
  }

  const handleSaveTask = async (data: any, taskId?: string) => {
    try {
      if (taskId) {
        const updatedTask = await updateTodo(taskId, data)
        if (updatedTask) {
          setTasks(currentTasks => currentTasks.map(t => t.id === taskId ? updatedTask : t))
          toast({ title: "Success", description: "Task updated successfully." })
        }
      } else {
        const newTask = await addTodo({ ...data, status: data.status || 'todo' })
        setTasks(currentTasks => [newTask, ...currentTasks])
        toast({ title: "Success", description: "Task added successfully." })
      }
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to save the task." })
    }
    setIsDialogOpen(false)
  }

  const handleDeleteConfirmation = (taskId: string) => {
    setTaskToDelete(taskId);
  }

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
        await deleteTodo(taskToDelete)
        setTasks(currentTasks => currentTasks.filter(t => t.id !== taskToDelete))
        toast({ title: "Success", description: "Task deleted." })
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to delete task." })
    }
    setTaskToDelete(null);
  }

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <PageHeader
        title="To-Do List"
        description="Organize your tasks and stay productive."
        actions={
          <Button onClick={() => handleOpenDialogForAdd('todo')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        }
      />
      <div className="flex-1 overflow-x-auto">
        {isLoading ? (
            <p className="text-center text-muted-foreground">Loading tasks...</p>
        ) : (
            <TodoBoard 
                tasks={tasks}
                onAddTask={handleOpenDialogForAdd}
                onEditTask={handleOpenDialogForUpdate}
                onDeleteTask={handleDeleteConfirmation}
            />
        )}
      </div>
      <AddTaskDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveTask}
        task={selectedTask}
        initialStatus={initialStatus}
      />
       <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTaskToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
