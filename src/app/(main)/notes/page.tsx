'use client'

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import NoteList from "@/features/notes/components/NoteList"
import NoteEditorSheet from "@/features/notes/components/NoteEditorSheet"
import type { Note } from "@/lib/types"

export default function NotesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleNewNote = () => {
    setSelectedNote(null)
    setIsSheetOpen(true)
  }

  const handleEditNote = (note: Note) => {
    setSelectedNote(note)
    setIsSheetOpen(true)
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
      <NoteList onEditNote={handleEditNote} />
      <NoteEditorSheet 
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        note={selectedNote}
      />
    </div>
  )
}
