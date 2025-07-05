'use client'

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TodoBoard from "@/features/todos/components/TodoBoard"
import AddTaskDialog from "@/features/todos/components/AddTaskDialog"

export default function TodosPage() {
  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <PageHeader
        title="To-Do List"
        description="Organize your tasks and stay productive."
        actions={
          <AddTaskDialog>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </AddTaskDialog>
        }
      />
      <div className="flex-1 overflow-x-auto">
        <TodoBoard />
      </div>
    </div>
  )
}
