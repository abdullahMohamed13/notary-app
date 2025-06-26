import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
// Libraries
import { formatDistanceToNow } from "date-fns"
// Shadcn components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Custom components
import AnimatedHeading from "@/components/AnimatedHeading"
// icons
import { FaArrowLeft } from "react-icons/fa"
// context
import NoteContext from "@/context/NoteContext"
import { useLanguage } from '@/context/LanguageContext';

export default function Show() {
  const noteContext = useContext(NoteContext)
  if (!noteContext) return null
  const { notesWithTags } = noteContext
  
  const { id } = useParams()

  const { t } = useLanguage();
  const navigate = useNavigate()

  const note = notesWithTags.find(note => note.id.toString() === id)

  if (!note) return <h1>{t('common.notFound')}</h1>

  return <>
    <AnimatedHeading msg={t('notes.viewNote')} />
    <div className="note-details break-words border p-4 rounded-md max-w-2xl mx-auto bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
      <p className="mb-4">{note.body}</p>
      {(note.tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags!.map(tag => (
            <Badge key={tag.id} style={{backgroundColor: tag.color}}>{tag.label}</Badge>
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        {t('notes.created')}: {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </p>
      <div className="mt-4 flex gap-3">
        <Link to={`/edit/${note.id}`}>
          <Button title={t('notes.editNote')}>{t('notes.editNote')}</Button>
        </Link>
        <Button variant="outline" title={t('common.back')} onClick={() => navigate(-1)}>
          <FaArrowLeft className="mr-1" /> {t('common.back')}
        </Button>
      </div>
    </div>
  </>
}
