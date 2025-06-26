import { useParams, useNavigate } from "react-router-dom"
import NoteForm from "@/components/NoteForm"
import NoteContext from "@/context/NoteContext"
import AnimatedHeading from "../components/AnimatedHeading"
import { useContext } from "react"
import type { NoteData } from "@/types/note"
import { useLanguage } from '@/context/LanguageContext';

// const { notes, setNotes } = useContext(NoteContext)
// const noteToEdit = notes.find(note => note.id.toString() === id)

export default function EditNotes() {
  const noteContext = useContext(NoteContext)
  if (!noteContext) return null
  const { notesWithTags, setNotes } = noteContext

  const { id } = useParams()
  const noteToEdit = notesWithTags.find(note => note.id.toString() === id)

  const navigate = useNavigate()
  const { t } = useLanguage();

  function onSubmit(updatedData: NoteData) {
    setNotes(prev =>
      prev.map(note =>
        note.id.toString() === id
          ? {
              ...note,
              title: updatedData.title,
              body: updatedData.body,
              tagIds: (updatedData.tags ?? []).map(tag => tag.id), // ← fallback added here
            }
          : note
      )
    )
    navigate("/")
  }

  if (!noteToEdit) return <h1>{t('common.notFound')}</h1>

  return <>
    <AnimatedHeading msg={t('edit.title')} />
    <NoteForm
      onSubmit={onSubmit}
      title={noteToEdit.title}
      body={noteToEdit.body}
      tags={noteToEdit.tags ?? []}
      isEditing={true}
    />
  </>
}
