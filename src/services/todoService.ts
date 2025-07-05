'use server';
import { mockTodos } from '@/lib/data';
import type { Todo } from '@/lib/types';

export async function getTodos(): Promise<Todo[]> {
  return mockTodos;
}
