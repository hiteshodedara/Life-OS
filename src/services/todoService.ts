'use server';
import { mockTodos } from '@/lib/data';
import type { Todo } from '@/lib/types';

export async function getTodos(): Promise<Todo[]> {
  // In a real app, this would fetch from a database.
  return mockTodos;
}

export async function addTodo(task: { title: string; content?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string | null }): Promise<Todo> {
  const newTodo: Todo = {
    id: `todo-${Date.now()}`,
    status: 'todo',
    title: task.title,
    content: task.content,
    priority: task.priority,
    dueDate: task.dueDate || null,
  };
  mockTodos.unshift(newTodo);
  return newTodo;
}
