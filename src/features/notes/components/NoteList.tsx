'use client'

import { useState } from "react"
import { mockNotes } from "@/lib/data"
import type { Note } from "@/lib/types"
import NoteCard from "./NoteCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type NoteListProps = {
  onEditNote: (note: Note) => void;
}

export default function NoteList({ onEditNote }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.map(note => (
                <NoteCard key={note.id} note={note} onEdit={() => onEditNote(note)} />
            ))}
        </div>
    </div>
  )
}
