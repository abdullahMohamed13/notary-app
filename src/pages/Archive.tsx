import { useContext } from "react"
import NoteContext from "@/context/NoteContext"
import Note from "@/components/Note"
import AnimatedHeading from '../components/AnimatedHeading'
import EmptyState from "@/components/EmptyState"
import { useLanguage } from '@/context/LanguageContext';
import { FaArchive } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Archive() {
  const navigate = useNavigate()
  const { notesWithTags } = useContext(NoteContext)
  const { t } = useLanguage();
  const archivedNotes = notesWithTags.filter(note => note.archived)
  return <>
    <AnimatedHeading msg={t('archive.title')} />
    {archivedNotes.length === 0 && (
      <div className="flex-c flex-col gap-2">
        <EmptyState icon="🗃️" title={t('archive.noArchivedNotes')} description={
            <span>
              {t('archive.archiveInstruction')} <FaArchive className="m-1 inline" />
            </span>
          }
          cta={<Button onClick={() => navigate("/new")}>{t('home.createNote')}</Button>}/>
      </div>
    )}
    <div className="archived-notes grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 items-center">
      {archivedNotes.map(note => <Note key={note.id} note={note} />)}
    </div>
  </>
}
