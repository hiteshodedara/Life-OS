'use client'

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function AddTaskDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Fill in the details for your new task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g., Finish report" />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="content">Description (Optional)</Label>
              <Textarea id="content" placeholder="Add more details..."/>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="grid items-center gap-1.5">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                        <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="grid items-center gap-1.5">
                    <Label htmlFor="dueDate">Due Date (Optional)</Label>
                    <Input id="dueDate" type="date" />
                 </div>
             </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
