export type Note = {
  id: number | string
  createdAt: string
  pinned?: boolean
  archived?: boolean
} & NoteData


export type NoteData = {
    title: string
    body: string
    tags?: Tag[]
}

export type Tag = {
    id: string,
    label: string
    color?: string 
}

export type RawNote = {
  id: string
  archived?: boolean
  pinned?: boolean
  createdAt: string
} & RawNoteData

export type RawNoteData = {
    title: string
    body: string
    tagIds: string[]
}

