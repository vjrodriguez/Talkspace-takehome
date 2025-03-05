import { useOnUpdateAvatarList } from './../Hooks'
import { useContext } from 'react'
import { AlertContext, AvatarListContext, AvatarContext } from './../context'
import { EditingContext } from './../context'
import { defaultRobot } from '../Services'
import '../styles/robotListItem.css'

interface Props {
  keyName: string
  name: string 
  url: string
  onEdit: (key: string) => void
}

const RobotListItem = (props: Props) => {
  const {keyName, name, url, onEdit} = props
  const {setAvatarList} = useContext(AvatarListContext)
  const {showAlert} = useContext(AlertContext)
  const { setAvatarOptions } = useContext(AvatarContext)
  const { setIsEditing } = useContext(EditingContext)

  const deleteAvatar = (keyN:string) => {
    try {
      window.localStorage.removeItem(keyN)
      setAvatarList(useOnUpdateAvatarList())
      setAvatarOptions(defaultRobot)
      setIsEditing(false)
      showAlert(`Successfully deleted ${name}`, 'success')
    } catch(error){
      console.log(error)
      showAlert('Unable to delete robot. Sorry.', 'error')
    }
  }

  return (
      <li key={keyName} className="avatar_item_container">
        <span className="item_avatar">
          <img
            src={url}
            alt={`${name} Avatar`}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="avatar_item_name">{name}</span>
        <button 
          className="avatar_edit"
          onClick={() => onEdit(keyName)}
          >✎</button>
        <button 
          className="avatar_delete"
          onClick={() => deleteAvatar(keyName)}
          >X</button>
      </li>
  )
}

export default RobotListItem