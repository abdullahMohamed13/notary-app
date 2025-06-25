import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  msg: string;
  isHome?: boolean;
};

export default function AnimatedHeading({ msg, isHome = false }: Props) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const { t, language } = useLanguage();

  const englishPhrases = [
      "What needs documenting? 📝",
      "Thoughts to capture?",
      "Psst... tell me something 👀",
      "What's on your mind today? ✍️",
  ]

  const spanishPhrases = [
    "¿Qué necesitas documentar? 📝",
    "¿Pensamientos para capturar?",
    "Psst... cuéntame algo 👀",
    "¿En qué estás pensando hoy? ✍️",
  ]
  const arabicPhrases = [
    "إيه اللي محتاج تكتبه؟ 📝",
    "عايز توثق فكرة؟",
    "بص بص.. قولّي حاجة 👀",
    "بتفكر في إيه دلوقتي؟ ✍️",
  ];
  
  const phrases = language === 'en' ? englishPhrases : language === 'ar' ? arabicPhrases : spanishPhrases

  useEffect(() => {
    if (!isHome) return

    let timeout: NodeJS.Timeout
    let currentIndex = 0
    let isDeleting = false
    let currentPhrase = phrases[currentPhase]

    const type = () => {
      if (isDeleting) {
        setDisplayedText(currentPhrase.substring(0, currentIndex - 1))
        currentIndex--
      } else {
        setDisplayedText(currentPhrase.substring(0, currentIndex + 1))
        currentIndex++
      }

      const typingSpeed = isDeleting ? 40 : 80

      if (!isDeleting && currentIndex === currentPhrase.length) {
        timeout = setTimeout(() => {
          if (currentPhase < phrases.length - 1) {
            isDeleting = true
            type()
          } else {
            setShowCursor(false) // Freeze on last msg
          }
        }, 1200) //pause time
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        setCurrentPhase(prev => prev + 1)
        currentPhrase = phrases[currentPhase + 1]
        timeout = setTimeout(type, 400)
      } else {
        timeout = setTimeout(type, typingSpeed)
      }
    }

    timeout = setTimeout(type, 800)

    return () => clearTimeout(timeout)
  }, [currentPhase, isHome,t('home.heading'), language])

  return (
    <AnimatePresence mode="wait">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-medium text-foreground my-4 min-h-[4rem]">
        {isHome ? (
          <span className="relative inline-flex items-center">
            {displayedText}
            <span className={`ml-1 inline-block h-7 w-0.5 ${showCursor ? 'bg-primary' : 'bg-transparent'}`} />
          </span>
        ) : (
          msg
        )}
      </motion.h2>
    </AnimatePresence>
  )
}