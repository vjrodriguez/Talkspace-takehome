import { PropsWithChildren } from 'react'
import '../../styles/UI/Alert.css'
import { AlertSeverity } from '../../Types'

interface Props {
  severity: AlertSeverity
  onClose?: () => void
}

const Alert = (props: PropsWithChildren<Props>) => {
  const { children, severity, onClose } = props

  const getIcon = () => {
    switch (severity) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '!'
      case 'info':
        return 'i'
      default:
        return ''
    }
  }

  return (
    <div className={`alert alert-${severity}`} role="alert">
      <div className="alert-content">
        <span className="alert-icon">{getIcon()}</span>
        <span className="alert-message">{children}</span>
      </div>
      {onClose && (
        <button 
          className="alert-close" 
          onClick={onClose}
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  )
}

/*
Benefits:
1. Centralized Notifications
- Single source of truth for alerts
- Consistent styling and behavior
2. User Experience
- Non-intrusive notifications
- Auto-dismissal
- Manual dismissal option
- Visual feedback through icons
3. Developer Experience
- Simple API (showAlert)
- Type safety
- Reusable component
- Context-based state management
4. Maintainability
- Separated concerns
- Clear component structure
- TypeScript type safety
*/
export default Alert 