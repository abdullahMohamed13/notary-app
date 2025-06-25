import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from "./mode-toggle"
import { Button } from '@/components/ui/button';
import { FaArrowLeft, FaArrowRight, FaHome, FaArchive } from "react-icons/fa";
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function NavBar() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return <nav className="px-4 py-2 w-full mb-10 flex-between flex-col gap-4 sm:gap-0 sm:flex-row [direction:ltr]">
            <div className="logo">
                <div className="flex items-center gap-2.5">
                    <h1 className="text-4xl font-bold flex items-center">
                      <Link to="/" className="flex items-center group">
                          <span className="relative w-8 h-10 mr-2">
                          <span className="absolute left-0 w-3 h-full bg-primary/20 border-r-2 border-primary rounded-l-sm"></span>
                          <span className="absolute left-1.5 w-3 h-full bg-primary/40 border-r-2 border-primary"></span>
                          <span className="absolute left-[15px] w-3 h-full bg-primary border-r-2 border-primary rounded-r-sm">N</span>
                          </span>
                          
                          <span className="relative">
                          <span className="text-foreground">otary</span>
                          <span className="absolute top-0 left-0 w-full h-full text-primary opacity-0 group-hover:opacity-100
                          transition-opacity duration-300" style={{ clipPath: 'inset(0 50% 0 0)' }}>
                              otary
                          </span>
                          </span>
                      </Link>
                    </h1>
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <LanguageSelector />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="navigation flex-col items-center w-auto justify-center">
                    <Button onClick={() => navigate(-1)} className="mx-0.5" title={t('nav.goBack')}><FaArrowLeft/></Button>
                    <Link to='/'><Button title={t('nav.goHome')}><FaHome /></Button></Link>
                    <Button onClick={() => navigate(1)} className="mx-0.5" title={t('nav.goForward')}><FaArrowRight/></Button>
                </div>
                <Link to='archive'><Button variant='secondary' className='w-full' title={t('nav.archive')}><FaArchive/></Button></Link>
            </div>
        </nav>
}

/*
<h1 className="text-4xl font-bold">
  <Link to="/" className="flex items-center group">
    <span className="relative">
      <span className="w-8 h-10 bg-white text-primary border-2 border-primary rounded-sm flex items-center justify-center">
        N
        <span className="absolute -left-1 -top-1 w-4 h-4 bg-primary transform origin-bottom-right rotate-45"></span>
      </span>
    </span>
    
    <span className="ml-2 relative">
      <span className="text-primary">otary</span>
      <span className="absolute -bottom-1 left-[calc(50%-5px)] w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </span>
  </Link>
</h1>
*/
