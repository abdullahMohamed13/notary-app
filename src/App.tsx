import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react'
// Libraries
import { motion, AnimatePresence } from 'framer-motion'
// Shadcn components
import { Toaster } from "@/components/ui/sonner"
import { Button } from './components/ui/button';
// Pages
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
// Context
import { useLanguage } from './context/LanguageContext';
// Lazy load these pages
const Show = lazy(() => import(`./pages/Show`));
const Archive = lazy(() => import(`./pages/Archive`));
const Create = lazy(() => import(`./pages/Create`));
const EditNotes = lazy(() => import(`./pages/EditNotes`));
const EditTags = lazy(() => import("./pages/EditTags"))

const AnimatedRoutes = () => {
  const location = useLocation();
  const { t } = useLanguage();

    return <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <NavBar />
          {/*  flex-grow */}
          <main className="app-container flex-grow">
            <Suspense fallback={<div className="loading" data-text={t('common.loading')}></div>}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<Create />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/tags" element={<EditTags />} />
                <Route path="/edit/:id" element={<EditNotes />} />
                <Route path="/:id" element={<Show />} />
                <Route path="*" element={
                    <div className='flex-c flex-col'>
                      <h1 className='text-red-500'>👉{t('common.notFound')}</h1>
                      <Link to='/'><Button>{t('common.goHome')}</Button></Link>
                  </div>
                } />
              </Routes>
            </Suspense>
          <Footer />
          </main>
        </motion.div>
    </AnimatePresence>
}

const toasterStyle: React.CSSProperties & Record<string, string> = {
  "--normal-bg": "var(--primary)",
  "--normal-text": "white",
  "--normal-border": "var(--border)",
};


export default function App() {
  return <>
    <Router>
      <AnimatedRoutes />
    </Router>
    <Toaster duration={4500} style={toasterStyle} />
  </>
}
