import NoteForm from "@/components/NoteForm";
import AnimatedHeading from '../components/AnimatedHeading';
import { useLanguage } from '@/context/LanguageContext';
import { useContext } from "react";
import NoteContext from "@/context/NoteContext";
import { v4 as uuid } from 'uuid';
import type { NoteData, RawNote } from "@/types/note";

export default function Create() {
  const { t } = useLanguage();
  const noteContext = useContext(NoteContext);
  if (!noteContext) return null;
  const { setNotes } = noteContext;

  function handleCreate(data: NoteData) {
    const newNote: RawNote = {
      id: uuid(),
      title: data.title,
      body: data.body,
      tagIds: (data.tags ?? []).map(tag => tag.id),
      createdAt: new Date().toISOString(),
    };

    setNotes(prev => [newNote, ...prev]);
  }

  return <>
    <AnimatedHeading msg={t('create.title')} />
    <NoteForm onSubmit={handleCreate} />
  </>;
}
