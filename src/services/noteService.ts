'use server';
import { db } from '@/lib/firebase';
import type { Note } from '@/lib/types';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp, serverTimestamp, getDoc, query, orderBy } from 'firebase/firestore';

// Helper to convert Firestore doc to Note type
const fromFirestoreToNote = (docSnap: any): Note => {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        tags: data.tags,
        createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
    };
};

export async function getNotes(): Promise<Note[]> {
  const notesCol = collection(db, 'notes');
  const q = query(notesCol, orderBy('updatedAt', 'desc'));
  const notesSnapshot = await getDocs(q);
  const notesList = notesSnapshot.docs.map(doc => fromFirestoreToNote(doc));
  return notesList;
}

export async function addNote(note: { title: string; content: string; tags?: string[] }): Promise<Note> {
    const newNoteRef = await addDoc(collection(db, 'notes'), {
        ...note,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    const newNoteSnap = await getDoc(newNoteRef);
    return fromFirestoreToNote(newNoteSnap);
}

export async function updateNote(noteId: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
    const noteRef = doc(db, 'notes', noteId);
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

export async function deleteNote(noteId: string): Promise<{ success: boolean }> {
    try {
        await deleteDoc(doc(db, 'notes', noteId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting note: ", error);
        return { success: false };
    }
}
