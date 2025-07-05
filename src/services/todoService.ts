'use server';
import { db } from '@/lib/firebase';
import type { Todo } from '@/lib/types';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';

// Helper to convert Firestore doc to Todo type
const fromFirestoreToTodo = (docSnap: any): Todo => {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        priority: data.priority,
        status: data.status,
        dueDate: data.dueDate || null, // Assuming dueDate is stored as a string
    };
};


export async function getTodos(): Promise<Todo[]> {
    const todosCol = collection(db, 'todos');
    const q = query(todosCol, orderBy('priority')); // Example ordering
    const todoSnapshot = await getDocs(q);
    return todoSnapshot.docs.map(fromFirestoreToTodo);
}

export async function addTodo(task: { title: string; content?: string; priority: 'low' | 'medium' | 'high'; dueDate?: string | null; status: Todo['status'] }): Promise<Todo> {
  const newTodoRef = await addDoc(collection(db, 'todos'), task);
  const newTodoSnap = await getDoc(newTodoRef);
  return fromFirestoreToTodo(newTodoSnap);
}

export async function updateTodo(taskId: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo | null> {
    const todoRef = doc(db, 'todos', taskId);
    try {
        await updateDoc(todoRef, updates);
        const updatedTodoSnap = await getDoc(todoRef);
        return fromFirestoreToTodo(updatedTodoSnap);
    } catch (error) {
        console.error("Error updating todo: ", error);
        return null;
    }
}

export async function deleteTodo(taskId: string): Promise<{ success: boolean }> {
    try {
        await deleteDoc(doc(db, 'todos', taskId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting todo: ", error);
        return { success: false };
    }
}
