'use server';
import { mockTodos } from '@/lib/data';
import type { Todo } from '@/lib/types';

export async function getTodos(): Promise<Todo[]> {
  // In a real app, this would fetch from a database.
  return mockTodos;
}

export async function addTodo(task: { title: string; content?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string | null; status: Todo['status'] }): Promise<Todo> {
  const newTodo: Todo = {
    id: `todo-${Date.now()}`,
    status: task.status,
    title: task.title,
    content: task.content || '',
    priority: task.priority,
    dueDate: task.dueDate || null,
  };
  mockTodos.unshift(newTodo);
  return newTodo;
}

export async function updateTodo(taskId: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo | null> {
    const taskIndex = mockTodos.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return null;
    }
    mockTodos[taskIndex] = { ...mockTodos[taskIndex], ...updates };
    return mockTodos[taskIndex];
}

export async function deleteTodo(taskId: string): Promise<{ success: boolean }> {
    const taskIndex = mockTodos.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
        mockTodos.splice(taskIndex, 1);
        return { success: true };
    }
    return { success: false };
}
