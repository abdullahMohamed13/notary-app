import { Link } from 'react-router-dom'
import NoteContext from '@/context/NoteContext'
// Shadcn components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { toast } from "sonner"
// Libraries
import CreatableReactSelect from 'react-select/creatable'
import { components } from 'react-select'
import { FaSave, FaTimes, FaStickyNote } from "react-icons/fa";
import { v4 as uuid } from 'uuid';
// Types
import type { Tag, NoteData, RawNote } from "@/types/note"
import { useRef, useState, useContext, useEffect, type FormEvent } from "react"
import { useLanguage } from '@/context/LanguageContext';

// Fade/slide animation for (CreatableReactSelect's) tags
const AnimatedMultiValue = (props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <components.MultiValue
      {...props}
      innerProps={{
        ...props.innerProps,
        style: {
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 150ms ease, transform 150ms ease',
        },
      }}
    />
  )
}

type NoteDataProps = {
  onSubmit: (data: NoteData) => void,
  title?: string
  body?: string
  tags?: Tag[]
  isEditing?: boolean
}

export default function NoteForm({ onSubmit, title = "", body = "", tags = [], isEditing = false }: NoteDataProps) {

  const noteContext = useContext(NoteContext)
  if(!noteContext) return null
  const { setNotes, tags: availableTags, setTags } = noteContext
  
  const { t } = useLanguage();

  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    const title = titleRef.current!.value
    const body = bodyRef.current!.value

    selectedTags.forEach(tag => {
      if (!availableTags.some(t => t.id === tag.id)) {
        setTags(prev => [...prev, tag])
      }
    })

    if (!isEditing) {
      const newNote: RawNote = {
        id: uuid(),
        title,
        body,
        tagIds: selectedTags.map(tag => tag.id),
        createdAt: new Date().toISOString(),
      }

      setNotes(prev => [newNote, ...prev])

      toast(t('toast.noteCreated'), {
        icon: "📝",
        description: t('toast.noteCreatedDescription'),
      })
    } else {
      toast(t('toast.noteUpdated'), {
        icon: "📝",
        description: t('toast.noteUpdatedDescription'),
      })
    }

    // Audio control
    const notification = new Audio('/linkedin_notification.mp3')
    notification.play()
    notification.volume = 0.7

    onSubmit({ title, body, tags: selectedTags })
  }

    return <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <div className="selectors flex justify-end flex-col md:flex-row gap-3">
            <div className="title-input flex-c gap-[0.4rem]">
                <Label htmlFor="form-title"><Badge variant="default">{t('notes.title')}</Badge></Label>
                <Input type="text" id="form-title" required ref={titleRef} defaultValue={title}
                placeholder={t('create.titlePlaceholder')}
                className='sm:w-[150px] md:w-[180px] lg:w-[210px] xl:w-[240px]' />
            </div>
            <div className="tags-selector-section flex-c gap-[0.4rem]">
                <Label htmlFor="tags"><Badge variant="secondary">{t('notes.tags')}</Badge></Label>
                <CreatableReactSelect
                  components={{ MultiValue: AnimatedMultiValue }}
                  className="w-full max-w-[300px] sm:w-[150px] md:w-[180px] lg:w-[210px] xl:w-[240px] dark:bg-input/30"
                  isMulti
                  id="tags"
                  placeholder={t('create.tagPlaceholder')}
                  // focus:shadow-xs transition-[color,box-shadow]
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      // backgroundColor: 'calc(var(--input) / 30 )',
                      borderColor: state.isFocused && 'var(--primary)',
                      boxShadow: state.isFocused ? '0 0 6px 1.7px var(--primary)' : 'none',
                      minHeight: '36px',
                      fontSize: '14px',
                      '&:hover': {
                        borderColor: 'none'
                      },
                      '&:focus': {
                        transitionProperty: 'all',
                      },
                    }),
                    option: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                      color: 'var(--secondary)',
                      cursor: 'pointer',
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: 'var(--secondary)',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '2px 4px',
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: 'white',
                      fontWeight: 500,
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: 'white',
                      ':hover': {
                        backgroundColor: 'white',
                        color: 'var(--secondary)',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 1000,
                    }),
                  }}

                  options={availableTags.map(tag => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  value={selectedTags.map(tag => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  onChange={(tags) => {
                    setSelectedTags(tags.map(tag => ({
                      label: tag.label,
                      id: tag.value,
                    })))
                  }}
                />
            </div>
        </div>
        <div className="flex-c flex-col">
            <Label className='mb-1.5'>{t('notes.content')}</Label>
            <Textarea placeholder={t('create.contentPlaceholder')} required ref={bodyRef} defaultValue={body}
            className="resize-none w-full max-w-2xl h-[120px] md:h-[150px] lg:h-[180px] p-4 mb-2 text-base" />
            <div className="decision flex-c gap-2">
                <Button type="submit" title={isEditing ? t('common.save') : t('create.createNote')}>
                  {isEditing ? <FaSave /> : <FaStickyNote />}
                </Button>
                <Link to='/'><Button className="bg-secondary hover:bg-destructive" title={t('common.cancel')}><FaTimes /></Button></Link>
            </div>
        </div>
    </form>
}
