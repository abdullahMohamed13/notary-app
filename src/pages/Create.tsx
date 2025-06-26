import NoteForm from "@/components/NoteForm";
import AnimatedHeading from '../components/AnimatedHeading';
import { useLanguage } from '@/context/LanguageContext';

export default function Create() {
  const { t } = useLanguage();

  return <>
    <AnimatedHeading msg={t('create.title')} />
    <NoteForm onSubmit={() => null} />
  </>;
}