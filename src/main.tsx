import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './components/theme-provider'
import { NoteProvider } from './context/NoteContext'
import { LanguageProvider } from './context/LanguageContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <NoteProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NoteProvider>
    </LanguageProvider>
  </StrictMode>
)
