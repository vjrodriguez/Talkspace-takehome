import { createContext, ReactNode, useEffect, useState } from "react"
import { AvatarOptions, AvatarList } from "./Types"
import Alert from "./components/UI/Alert";

interface AvatarContextType {
  avatarOptions: AvatarOptions;
  setAvatarOptions: React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

interface AvatarListContextType {
  avatarList: AvatarList;
  setAvatarList: React.Dispatch<React.SetStateAction<AvatarList>>;
}


type Severity = 'error' | 'warning' | 'success';

interface AlertContext {
  showAlert: (message: string, severity: Severity) => void
}

export const AlertContext = createContext<AlertContext>({} as AlertContext)


export const AlertContextProvider = ({children}: {children: ReactNode}) => {
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined)

  const [alertSeverity, setAlertSeverity] = useState<Severity | undefined>(undefined)

  const showAlert = (message: string, severity: Severity) =>{
    setAlertMessage(message);
    setAlertSeverity(severity)
  }

  const clearAlert = () => {
    setAlertMessage(undefined)
    setAlertSeverity(undefined)
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("alertMessage", alertMessage)
      if(alertMessage) {
        setAlertMessage(undefined)
        setAlertSeverity(undefined)
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
    
  }, [alertMessage])

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

export const AvatarContext = createContext<AvatarContextType>({} as AvatarContextType)
export const AvatarURLContext = createContext<string>("")
export const AvatarListContext = createContext<AvatarListContextType>({} as AvatarListContextType)