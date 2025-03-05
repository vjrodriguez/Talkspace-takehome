import { PropsWithChildren } from 'react'
import '../../styles/UI/Alert.css'

export type AlertSeverity = 'success' | 'error' | 'warning' | 'info' 

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

export default Alert 