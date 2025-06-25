import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
// Shadcn components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
// Custom components
import AnimatedHeading from '../components/AnimatedHeading';
import ConfirmDialog from "@/components/confirm-dialog"
import Note from '@/components/Note';
// Context
import NoteContext from '@/context/NoteContext';
import { useLanguage } from '@/context/LanguageContext';
import EmptyState from '@/components/EmptyState';

export default function Home() {
    const navigate = useNavigate()

    const { notesWithTags, notes, setNotes } = useContext(NoteContext)
    const { t } = useLanguage();
    const pinnedNotes = notesWithTags.filter(note => note.pinned && !note.archived)

    const [titleQuery, setTitleQuery] = useState("")
    const [tagQuery, setTagQuery] = useState("")

    const resetNotes = () => {
        if (notes.length !== 0) {
            setNotes([]);
            toast(t('toast.workspaceCleared'), {
                icon: "🧹",
                description: t('toast.workspaceClearedDesc'),
            })
        }
    }

    return <>
        <AnimatedHeading msg={t("home.heading")} isHome={true}/>
        <div className="btns mt-2 flex justify-center flex-col sm:flex-row md:justify-end items-center gap-[0.6em]">
            {/*  default |outline | secondary | destructive */}
            {/* w-[100px] */}
            <Button onClick={() => navigate('/new')} className='w-[100px]'>{t('home.create')}</Button>
            {/* w-[80px] text-center px-[50px] */}
            <Button onClick={() => navigate('/tags')} className=''>{t('home.editTags')}</Button>
        </div>
        
        <div className='search-section flex flex-col items-center gap-2
                        sm:justify-center sm:flex-c sm:flex-row'>
            <div className="title-search-bar flex-row gap-1.5 sm:flex-col">
                <Label htmlFor="title-search-bar"><Badge variant="default">{t('home.title')}</Badge></Label>
                <Input type="search" id="title-search-bar" placeholder={t('home.search')} className="w-auto" value={titleQuery}
                    onChange={(e) => setTitleQuery(e.target.value)}/>
            </div>
            <div className="tag-search-bar flex-row gap-1.5 sm:flex-col">
                <Label htmlFor="tags-search-bar"><Badge variant="secondary">{t('home.tags')}</Badge></Label>
                <Input type="search" id="tags-search-bar" placeholder={t('home.search')} className="w-auto" value={tagQuery}
                    onChange={(e) => setTagQuery(e.target.value)}/>
            </div>
        </div>

        <Separator />

        <div className="pinned-notes-section w-full flex-c flex-col">
            <div className="w-full max-w-5xl px-4">
                {pinnedNotes.length === 0 ? (
                    <div className="text-center text-muted-foreground flex flex-col items-center gap-2 mt-4">
                        <span className="text-4xl">📌</span>
                        <p className="text-base">{t('home.noPinnedNotes')}</p>
                        <p className="text-sm">{t('home.pinInstructions')}</p>
                    </div>):
                    <h3 className="text-xl text-center mb-5 text-muted-foreground">{t('home.pinnedNotes')}</h3>
                }

                <Carousel className="w-full overflow-visible"> {/*px-0*/}
                    {pinnedNotes.length !== 0 && <CarouselPrevious className='top-0 sm:left-[-20px] md:left-[-30px] lg:left-[-40px]' />}
                    <CarouselContent className="flex snap-x">
                    {pinnedNotes.map(note => (
                        <CarouselItem
                        key={note.id}
                        className="basis-[270px] shrink-0 snap-start"
                        >
                        <Note note={note} />
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    {pinnedNotes.length !== 0 && <CarouselNext className='top-0 sm:right-[-20px] md:right-[-30px] lg:right-[-40px]' />}
                </Carousel>
            </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-3 items-center mb-4 gap-2">
            <h3 className="text-xl sm:col-start-2 text-center">
                {notesWithTags.filter(note => !note.archived && !note.pinned).length === 0 ?
                    <EmptyState icon="🗂️" title={t('home.noNotesFound')} description={t('home.tryCreating')}
                        cta={<Button onClick={() => navigate("/new")}>{t('home.createNote')}</Button>}/> :
                <p className="text-muted-foreground">{t('home.yourNotes')}</p>}
            </h3>

            {notes.length !== 0 && (
                <div className="sm:col-start-3 sm:justify-self-end justify-self-center">
                    <ConfirmDialog
                        title={t('home.deleteAllConfirm')}
                        description={t('home.deleteAllDescription') + `${notes.length})`}
                        confirmText={t('home.deleteAll')}
                        onConfirm={resetNotes}>
                        <Button variant="secondary">{t('home.deleteAllNotes')}</Button>
                    </ConfirmDialog>
                </div>
            )}
        </div>

        <div className='current-notes-section grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center gap-2 items-start'>
            {notesWithTags.filter(note => !note.archived && !note.pinned).filter(note =>
                note.title.toLowerCase().includes(titleQuery.toLowerCase()) &&
                (tagQuery.trim() === "" || note.tags?.some(tag =>
                    tag.label.toLowerCase().includes(tagQuery.toLowerCase())
                ))).map(note => <Note key={note.id} note={note} />)}
        </div>
    </>
}
