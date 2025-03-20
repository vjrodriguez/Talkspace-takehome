import { createContext, ReactNode, useEffect, useState } from "react"
import { AvatarOptions, AvatarList } from "./Types"
import Alert from "./components/UI/Alert";
import { AlertSeverity } from "./Types";

interface AvatarContextType {
  avatarOptions: AvatarOptions;
  setAvatarOptions: React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

interface AvatarListContextType {
  avatarList: AvatarList;
  setAvatarList: React.Dispatch<React.SetStateAction<AvatarList>>;
}
// define the shape of the alert context
interface AlertContext {
  // a type-safe way to show alerts
  showAlert: (message: string, severity: AlertSeverity) => void
}
// initialize with a type assertion for empty object
export const AlertContext = createContext<AlertContext>({} as AlertContext)


export const AlertContextProvider = ({children}: {children: ReactNode}) => {
  // state for the alert message
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)
  // state for the alert severity
  const [alertSeverity, setAlertSeverity] = useState<AlertSeverity | undefined>(undefined)

  // function to show the alert
  const showAlert = (message: string, severity: AlertSeverity) =>{
    setAlertMessage(message);
    setAlertSeverity(severity)
  }

  const clearAlert = () => {
    setAlertMessage(undefined)
    setAlertSeverity(undefined)
  }


  useEffect(() => {
    const timer = setTimeout(() => {
    //  console.log("alertMessage", alertMessage)
      if(alertMessage) {
        setAlertMessage(undefined)
        setAlertSeverity(undefined)
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
    
  }, [alertMessage])

  // return the alert context provider
  return (
    <AlertContext.Provider value={{showAlert}}>
      {
        !!alertSeverity && !!alertMessage && (
        <Alert 
            severity={alertSeverity}
            onClose={() => clearAlert()}
          >
            {alertMessage}
          </Alert>
        )
      }
      {children}
    </AlertContext.Provider>
  )
}

interface EditingContextType {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
}

export const EditingContext = createContext<EditingContextType>({
  isEditing: false,
  setIsEditing: () => {},
})
interface EditingContextProviderProps {
  children: ReactNode
}

export const EditingContextProvider = ({ children }: EditingContextProviderProps) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditingContext.Provider>
  )
} 

export const AvatarContext = createContext<AvatarContextType>({} as AvatarContextType)
export const AvatarURLContext = createContext<string>("")
export const AvatarListContext = createContext<AvatarListContextType>({} as AvatarListContextType)
