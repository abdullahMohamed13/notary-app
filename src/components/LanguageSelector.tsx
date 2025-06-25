import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: t('language.english'), flag: 'EN' },
    { code: 'ar', name: t('language.arabic'), flag: 'AR' },
    { code: 'es', name: t('language.spanish'), flag: 'ES' },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <FaGlobe className="h-4 w-4" />
          <span className="sr-only">{t('language.selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang.code ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1 text-left">{lang.name}</span>
            {language === lang.code && (
              <span className="text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector; 