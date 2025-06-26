import { useContext } from "react"
import { Link } from "react-router-dom"
// Shadcn components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedHeading from "@/components/AnimatedHeading"
import { toast } from "sonner"
// Icons
import { FaTrash} from "react-icons/fa";
// Context
import NoteContext from "@/context/NoteContext"
import { useLanguage } from '@/context/LanguageContext';
import EmptyState from "@/components/EmptyState"
// Types
import type { Tag } from '../types/note';

export default function EditTags() {
  const noteContext = useContext(NoteContext)
  if (!noteContext) return null
  const { tags, setTags } = noteContext

  const { t } = useLanguage();

  const handleChange = (id: string, field: keyof Tag, value: string) => {
    setTags(prev =>
      prev.map(tag => (tag.id === id ? { ...tag, [field]: value } : tag))
    )
  }

  const deleteTag = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id))
    toast(t('toast.tagDeleted'), {
      icon: "🏷️",
      description: t('toast.tagDeleted'),
    })
  }

  return (
    <div className="flex flex-col mt-5 max-w-md mx-auto">
      <AnimatedHeading msg={t('tags.title')}></AnimatedHeading>
      {tags.length === 0 && <EmptyState icon="🏷️" title={t('tags.noTags')} />}
      {tags.map(tag => (
        <div key={tag.id} className="flex items-center gap-2">
          <Input type="text" value={tag.label} onChange={e => handleChange(tag.id, "label", e.target.value)}
          placeholder={t('tags.tagName')}
          />
          <Input type="color" value={tag.color || "#cccccc"} onChange={e => handleChange(tag.id, "color", e.target.value)}
            className="w-[40px] h-[40px] p-1" title={t('tags.tagColor')}/>
          <Badge style={{ backgroundColor: tag.color }} className="text-foreground">{tag.label}</Badge>
          <Button variant="destructive" onClick={() => deleteTag(tag.id)} className="bg-secondary hover:bg-destructive"
            title={t('tags.deleteTag')}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button className="w-fit mt-1 mx-auto"><Link to='/'>{tags.length === 0 ? t('common.goHome') : t('common.save')}</Link></Button>
    </div>
  )
}
