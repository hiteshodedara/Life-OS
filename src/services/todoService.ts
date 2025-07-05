'use server';
import { db } from '@/lib/firebase';
import type { Todo } from '@/lib/types';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';

// Helper to convert Firestore doc to Todo type
const fromFirestoreToTodo = (docSnap: any): Todo => {
    const data = docSnap.data() || {};
    return {
        id: docSnap.id,
        title: data.title || 'Untitled Task',
        content: data.content || '',
        priority: data.priority || 'medium',
        status: data.status || 'todo',
        dueDate: data.dueDate || null,
    };
};


export async function getTodos(userId: string): Promise<Todo[]> {
    if (!userId) return [];
    const todosCol = collection(db, `users/${userId}/todos`);
    const q = query(todosCol, orderBy('priority')); // Example ordering
    const todoSnapshot = await getDocs(q);
    return todoSnapshot.docs.map(fromFirestoreToTodo);
}

export async function addTodo(userId: string, task: { title: string; content?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string | null; status: Todo['status'] }): Promise<Todo> {
  if (!userId) throw new Error("User not authenticated");
  const newTodoRef = await addDoc(collection(db, `users/${userId}/todos`), task);
  const newTodoSnap = await getDoc(newTodoRef);
  return fromFirestoreToTodo(newTodoSnap);
}

export async function updateTodo(userId: string, taskId: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo | null> {
    if (!userId) throw new Error("User not authenticated");
    const todoRef = doc(db, `users/${userId}/todos`, taskId);
    try {
        await updateDoc(todoRef, updates);
        const updatedTodoSnap = await getDoc(todoRef);
        return fromFirestoreToTodo(updatedTodoSnap);
    } catch (error) {
        console.error("Error updating todo: ", error);
        return null;
    }
}

export async function deleteTodo(userId: string, taskId: string): Promise<{ success: boolean }> {
    if (!userId) throw new Error("User not authenticated");
    try {
        await deleteDoc(doc(db, `users/${userId}/todos`, taskId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting todo: ", error);
        return { success: false };
    }
}
