import type { Note } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type NoteCardProps = {
    note: Note;
    onEdit: () => void;
}

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  return (
    <Card className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow" onClick={onEdit}>
        <CardHeader>
            <CardTitle className="font-headline">{note.title}</CardTitle>
            <CardDescription>{new Date(note.createdAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">{note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
        </CardContent>
        <CardFooter>
            <div className="flex flex-wrap gap-1">
                {note.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
        </CardFooter>
    </Card>
  )
}
