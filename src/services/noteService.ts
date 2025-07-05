'use server';
import { db } from '@/lib/firebase';
import type { Note } from '@/lib/types';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp, serverTimestamp, getDoc, query, orderBy } from 'firebase/firestore';

// Helper to convert Firestore doc to Note type
const fromFirestoreToNote = (docSnap: any): Note => {
    const data = docSnap.data() || {};
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString();
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : new Date().toISOString();

    return {
        id: docSnap.id,
        title: data.title || "Untitled Note",
        content: data.content || "",
        tags: data.tags || [],
        createdAt: createdAt,
        updatedAt: updatedAt,
    };
};

export async function getNotes(userId: string): Promise<Note[]> {
  if (!userId) return [];
  const notesCol = collection(db, `users/${userId}/notes`);
  const q = query(notesCol, orderBy('updatedAt', 'desc'));
  const notesSnapshot = await getDocs(q);
  const notesList = notesSnapshot.docs.map(doc => fromFirestoreToNote(doc));
  return notesList;
}

export async function addNote(userId: string, note: { title: string; content: string; tags?: string[] }): Promise<Note> {
    if (!userId) throw new Error("User not authenticated");
    const newNoteRef = await addDoc(collection(db, `users/${userId}/notes`), {
        ...note,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    const newNoteSnap = await getDoc(newNoteRef);
    return fromFirestoreToNote(newNoteSnap);
}

export async function updateNote(userId: string, noteId: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
    if (!userId) throw new Error("User not authenticated");
    const noteRef = doc(db, `users/${userId}/notes`, noteId);
    try {
        await updateDoc(noteRef, {
            ...updates,
            updatedAt: serverTimestamp(),
        });
        const updatedNoteSnap = await getDoc(noteRef);
        return fromFirestoreToNote(updatedNoteSnap);
    } catch (error) {
        console.error("Error updating note: ", error);
        return null;
    }
}

export async function deleteNote(userId: string, noteId: string): Promise<{ success: boolean }> {
    if (!userId) throw new Error("User not authenticated");
    try {
        await deleteDoc(doc(db, `users/${userId}/notes`, noteId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting note: ", error);
        return { success: false };
    }
}
