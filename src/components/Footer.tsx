import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaCss3 } from 'react-icons/fa';
import { Separator } from './ui/separator';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return <>
    <Separator />
    <footer className="text-foreground text-center md:text-left px-2.5">
      <div>
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">{t('footer.developer')}: Abdallah Aziz</h3>
            <p className="text-sm mt-1">© {new Date().getFullYear()} {t('footer.appName')}. {t('footer.allRightsReserved')}.</p>
          </div>

          <div className="flex space-x-4">
            <a href="https://linkedin.com/in/abdallah-aziz-999b54295" target="_blank" rel="noopener noreferrer"
            className="hover:text-secondary transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a 
              href="https://github.com/abdullahMohamed13"  target="_blank"  rel="noopener noreferrer"
              className="hover:text-secondary transition-colors" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a  href="mailto:abdullah.229op@gmail.com"  className="hover:text-secondary transition-colors" aria-label="Email">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>

        <p className='mt-6 text-center text-sm text-muted-foreground'>
          {t('footer.builtWith')} React <FaReact className='inline' /> {t('footer.and')} TailwindCSS <FaCss3 className='inline'/>
        </p>
      </div>
    </footer>
    </>
};

export default Footer;