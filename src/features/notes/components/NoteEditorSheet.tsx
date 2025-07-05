'use client'

import type { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"

type NoteData = {
    title: string;
    content: string;
    tags: string[];
}
type NoteEditorSheetProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    note: Note | null;
    onSave: (data: NoteData, noteId?: string) => void;
}

export default function NoteEditorSheet({ isOpen, onOpenChange, note, onSave }: NoteEditorSheetProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (note && isOpen) {
            setTitle(note.title);
            setContent(note.content);
            setTags(note.tags.join(', '));
        } else if (!note && isOpen) {
            setTitle('');
            setContent('');
            setTags('');
        }
    }, [note, isOpen])

    const handleSubmit = () => {
        const noteData: NoteData = {
            title,
            content,
            tags: tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
        }
        onSave(noteData, note?.id);
    }
    
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg w-[90vw] flex flex-col p-0">
                <SheetHeader className="p-6">
                    <SheetTitle>{note ? 'Edit Note' : 'New Note'}</SheetTitle>
                    <SheetDescription>
                        {note ? 'Make changes to your note here.' : 'Create a new note. Click save when you\'re done.'}
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 min-h-0">
                    <div className="space-y-4 px-6 py-4">
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[300px]" />
                        </div>
                         <div className="grid items-center gap-1.5">
                            <Label htmlFor="tags">Tags (comma-separated)</Label>
                            <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                        </div>
                    </div>
                </ScrollArea>
                <SheetFooter className="p-6 border-t">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save Note</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
