import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { AlertContextProvider, EditingContextProvider } from './context'

// These providers (AlertContext and EditingContext) are in main.tsx because:
// They are application-wide concerns that need to be available throughout the entire app
// They manage global application state (alerts and editing mode)
// They don't depend on component-specific state
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertContextProvider>
      <EditingContextProvider>
        <App />
      </EditingContextProvider>
    </AlertContextProvider>
  </StrictMode>,
)
