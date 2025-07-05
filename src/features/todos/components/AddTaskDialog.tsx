'use client'

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Todo } from "@/lib/types"

const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().nullable().optional(),
  status: z.enum(["todo", "in-progress", "done"]),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type AddTaskDialogProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSave: (data: TaskFormValues, taskId?: string) => void
    task: Todo | null,
    initialStatus?: Todo['status']
}

export default function AddTaskDialog({ isOpen, onOpenChange, onSave, task, initialStatus }: AddTaskDialogProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
        title: "",
        content: "",
        priority: "medium",
        dueDate: null,
        status: initialStatus || "todo"
    }
  });

  useEffect(() => {
    if (isOpen) {
        const defaultDueDate = task?.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : null;
        form.reset({
            title: task?.title || '',
            content: task?.content || '',
            priority: task?.priority || 'medium',
            dueDate: defaultDueDate,
            status: task?.status || initialStatus || 'todo',
        });
    }
  }, [isOpen, task, initialStatus, form]);

  const onSubmit = (data: TaskFormValues) => {
    onSave(data, task?.id);
  }

  const handleClose = () => {
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update the details of your task." : "Fill in the details for your new task."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="task-form">
            <div className="grid gap-4 py-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Finish report" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Add more details..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            </form>
        </Form>
        <DialogFooter>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="task-form">{task ? "Save Changes" : "Add Task"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
