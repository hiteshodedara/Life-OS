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
  SheetClose
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"

type NoteEditorSheetProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    note: Note | null;
}

export default function NoteEditorSheet({ isOpen, onOpenChange, note }: NoteEditorSheetProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if(note) {
            setTitle(note.title);
            setContent(note.content);
            setTags(note.tags.join(', '));
        } else {
            setTitle('');
            setContent('');
            setTags('');
        }
    }, [note, isOpen])

    const handleSubmit = () => {
        // In a real app, save the note
        console.log({ title, content, tags: tags.split(',').map(t => t.trim()) });
        onOpenChange(false);
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
                <div className="flex-1 min-h-0">
                  <ScrollArea className="h-full">
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
                </div>
                <SheetFooter className="p-6">
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button onClick={handleSubmit}>Save Note</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
