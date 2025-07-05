'use server';
import { mockNotes } from '@/lib/data';
import type { Note } from '@/lib/types';

export async function getNotes(): Promise<Note[]> {
  // In a real app, this would fetch from a database.
  return mockNotes;
}

export async function addNote(note: { title: string; content: string; tags?: string[] }): Promise<Note> {
  const newNote: Note = {
    id: `note-${Date.now()}`,
    title: note.title,
    content: note.content,
    tags: note.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockNotes.unshift(newNote);
  return newNote;
}
