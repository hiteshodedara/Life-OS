'use client'

import { useState } from "react"
import type { Note } from "@/lib/types"
import NoteCard from "./NoteCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type NoteListProps = {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export default function NoteList({ notes, onEditNote, onDeleteNote }: NoteListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search notes by title, content, or tag..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        {notes.length === 0 && !searchTerm && (
            <p className="text-center text-muted-foreground pt-8">You don't have any notes yet. Create one!</p>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.map(note => (
                <NoteCard key={note.id} note={note} onEdit={onEditNote} onDelete={onDeleteNote} />
            ))}
        </div>
    </div>
  )
}
