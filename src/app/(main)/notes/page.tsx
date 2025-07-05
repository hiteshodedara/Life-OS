'use client'

import { useState, useEffect } from "react"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import NoteList from "@/features/notes/components/NoteList"
import NoteEditorSheet from "@/features/notes/components/NoteEditorSheet"
import type { Note } from "@/lib/types"
import { getNotes, addNote, updateNote, deleteNote } from "@/services/noteService"
import { useToast } from "@/hooks/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import NoteListSkeleton from "@/features/notes/components/NoteListSkeleton"
import { useAuth } from "@/contexts/AuthContext"

export default function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const fetchedNotes = await getNotes(user.uid);
        // sort by most recently updated
        fetchedNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setNotes(fetchedNotes);
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to load notes." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [user, toast]);

  const handleNewNote = () => {
    setSelectedNote(null)
    setIsSheetOpen(true)
  }

  const handleEditNote = (note: Note) => {
    setSelectedNote(note)
    setIsSheetOpen(true)
  }

  const handleSaveNote = async (data: any, noteId?: string) => {
    if (!user) return;
    try {
      if (noteId) {
        const updatedNote = await updateNote(user.uid, noteId, data);
        if (updatedNote) {
            setNotes(currentNotes => currentNotes.map(n => n.id === noteId ? updatedNote : n).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
            toast({ title: "Success", description: "Note updated." })
        }
      } else {
        const newNote = await addNote(user.uid, data);
        setNotes(currentNotes => [newNote, ...currentNotes])
        toast({ title: "Success", description: "Note created." })
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save note." })
    }
    setIsSheetOpen(false)
  }

  const handleDeleteConfirmation = (noteId: string) => {
    setNoteToDelete(noteId);
  }

  const handleDelete = async () => {
    if (!noteToDelete || !user) return;
    try {
        await deleteNote(user.uid, noteToDelete);
        setNotes(currentNotes => currentNotes.filter(n => n.id !== noteToDelete))
        toast({ title: "Success", description: "Note deleted." })
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to delete note." })
    }
    setNoteToDelete(null);
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Notes"
        description="Capture your thoughts, ideas, and reminders."
        actions={
          <Button onClick={handleNewNote}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Button>
        }
      />
       {isLoading ? (
            <NoteListSkeleton />
        ) : (
            <NoteList
                notes={notes}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteConfirmation}
            />
        )}
      <NoteEditorSheet 
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        note={selectedNote}
        onSave={handleSaveNote}
      />
      <AlertDialog open={!!noteToDelete} onOpenChange={() => setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setNoteToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
