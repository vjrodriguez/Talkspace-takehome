import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { AlertContextProvider } from './context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
             <AlertContextProvider>
             <App />
             </AlertContextProvider> 
  </StrictMode>,
)
