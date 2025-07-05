'use server';
import { mockNotes } from '@/lib/data';
import type { Note } from '@/lib/types';

export async function getNotes(): Promise<Note[]> {
  return mockNotes;
}
