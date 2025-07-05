import type { Todo } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar, MoreVertical, Flag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type TaskCardProps = {
  task: Todo;
  onStatusChange: (taskId: string, newStatus: Todo['status']) => void;
};

const priorityStyles = {
    high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
    low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
};

const isOverdue = (dueDate: string | null) => {
    return dueDate && new Date(dueDate) < new Date();
}

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between p-4">
                <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onStatusChange(task.id, 'todo')}>To Do</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(task.id, 'in-progress')}>In Progress</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(task.id, 'done')}>Done</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                {task.content && <p className="text-sm text-muted-foreground mb-4">{task.content}</p>}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        {task.dueDate && (
                            <div className={cn("flex items-center gap-1", isOverdue(task.dueDate) ? "text-destructive" : "")}>
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                    <Badge variant="outline" className={cn("capitalize", priorityStyles[task.priority])}>
                        <Flag className="w-3 h-3 mr-1" />
                        {task.priority}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
