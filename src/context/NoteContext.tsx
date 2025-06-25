import { createContext, useMemo, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { RawNote, Tag } from '../types/note';

type NoteContextType = {
  notes: RawNote[]
  setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  notesWithTags: (RawNote & { tags?: Tag[] })[]
}

type NoteProviderProps = {
  children: ReactNode
}

const NoteContext = createContext<NoteContextType | null>(null)

export const NoteProvider = ({children}: NoteProviderProps) => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

    const notesWithTags = useMemo(() => {
      return notes.map(note => ({
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id)),
      }))
    }, [notes, tags])

    return <NoteContext.Provider value={{notes, setNotes, tags, setTags, notesWithTags}}>
        {children}
    </NoteContext.Provider>
}

export default NoteContext;
