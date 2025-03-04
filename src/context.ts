import { createContext } from "react"
import { AvatarOptions, AvatarList } from "./Types"

interface AvatarContextType {
  avatarOptions: AvatarOptions;
  setAvatarOptions: React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

interface AvatarListContextType {
  avatarList: AvatarList;
  setAvatarList: React.Dispatch<React.SetStateAction<AvatarList>>;
}

export const AvatarContext = createContext<AvatarContextType>({} as AvatarContextType)
export const AvatarURLContext = createContext<string>("")
export const AvatarListContext = createContext<AvatarListContextType>({} as AvatarListContextType)