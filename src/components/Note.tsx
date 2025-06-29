import { Link } from "react-router-dom";
import { useContext } from "react";
import { formatDistanceToNow } from "date-fns"
import { enUS, ar, es } from "date-fns/locale"
// Shadcn components
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import ConfirmDialog from "@/components/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
// icons
import { FaTrash, FaArchive, FaEdit } from "react-icons/fa";
// Context
import NoteContext from "@/context/NoteContext";
import { useLanguage } from "@/context/LanguageContext";
// Types
import type { Note } from "@/types/note";
type Props = {
  note: Note
}

export default function Note({ note }: Props) {

  const noteContext = useContext(NoteContext);
  if (!noteContext) return null;

  const {setNotes} = noteContext;
  const { t, language } = useLanguage();

  const getLocale = () => {
    switch (language) {
      case 'ar':
        return ar;
      case 'es':
        return es;
      default:
        return enUS;
    }
  };

  function deleteNote(id: string): void {
    setNotes(prev => prev.filter(note => note.id.toString() !== id));
    toast(t('toast.noteDeleted'), {
      icon: "🗑️",
      // description: t('toast.noteDeleted'),
    })
  }

  function toggleArchive(id: string): void {
    setNotes(prev =>
      prev.map(note =>
        note.id.toString() === id ? { ...note, archived: !note.archived } : note
      )
    )

    toast(note.archived ? t('toast.noteUnarchived') : t('toast.noteArchived'), {
      icon: "🗃️",
      description: note.archived ? t('toast.noteUnarchivedDescription') : t('toast.noteArchivedDescription'),
    })
  }
  
  function togglePin(id: string): void {
    setNotes(prev =>
      prev.map(note =>
        note.id.toString() === id ? { ...note, pinned: !note.pinned } : note
      )
    )
    toast(note.pinned ? t('toast.noteUnpinned') : t('toast.notePinned'), {
      icon: "📌",
    })
  }

  if (!note) return null

  return (
    <Card className="w-full max-w-sm break-words">
      <CardHeader>
        <div className="flex-between">
          <CardTitle>{note.title}</CardTitle>
          <Button
            onClick={() => togglePin(note.id.toString())}
            variant="outline"
            title={note.pinned ? t('notes.unpinNote') : t('notes.pinNote')}
            className="rounded-full w-[30px] mr-[-16px] mt-[-16px] text-[15px]">
            {note.pinned ? "📌" : "📍"}
          </Button>
        </div>
      </CardHeader>
      <Link to={`/${note.id}`}>
        <CardContent className="cursor-pointer">
          <div className="whitespace-pre-wrap">{note.body}</div>
          {note.tags && note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.map(tag => (
                <Badge key={tag.id} variant="outline" className="text-xs text-foreground"
                  style={{ backgroundColor: tag.color || "transparent" }}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex-between gap-1">
        <CardDescription className="text-[13px] text-muted-foreground">
          {formatDistanceToNow(new Date(note.createdAt), { 
            addSuffix: true,
            locale: getLocale()
          })}
        </CardDescription>
        <div className="note-btns flex gap-1">
          <ConfirmDialog title={t('edit.deleteConfirm')} description={t('edit.deleteDescription')} confirmText={t('notes.deleteNote')}
            onConfirm={() => deleteNote(note.id.toString())}>
            <Button title={t('notes.deleteNote')}><FaTrash /></Button>
          </ConfirmDialog>
          
          <Button onClick={() => toggleArchive(note.id.toString())} variant="outline"
            title={note.archived ? t('notes.unarchiveNote') : t('notes.archiveNote')}>
            <FaArchive />
          </Button>
          <Link to={`/edit/${note.id}`}>
            <Button variant="outline" title={t('notes.editNote')}><FaEdit /></Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
