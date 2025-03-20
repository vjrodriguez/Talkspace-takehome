import { useOnUpdateAvatarList } from './../Hooks'
import { useContext } from 'react'
import { AlertContext, AvatarListContext, AvatarContext } from './../context'
import { EditingContext } from './../context'
import { defaultRobot } from '../Services'
import '../styles/robotListItem.css'

/**
 * Component that represents a single avatar item in the list.
 * Handles individual avatar display, editing, and deletion.
 * Uses context for state management and user feedback.
 */
interface Props {
  keyName: string  // Unique identifier for the avatar
  name: string     // Display name of the avatar
  url: string      // Generated avatar image URL
  onEdit: (key: string) => void  // Callback for edit operations
}

const RobotListItem = (props: Props) => {
  const {keyName, name, url, onEdit} = props

  // Context hooks for state management
  const {setAvatarList} = useContext(AvatarListContext)  // Updates the full avatar list
  const {showAlert} = useContext(AlertContext)           // Handles user notifications
  const { setAvatarOptions } = useContext(AvatarContext) // Controls avatar configuration
  const { setIsEditing } = useContext(EditingContext)    // Manages edit mode state

  /**
   * Handles avatar deletion from localStorage and updates UI
   * Includes error handling and user feedback
   * Resets editing state to prevent editing deleted avatars
   * @param keyN - Unique key of the avatar to delete
   */
  const deleteAvatar = (keyN:string) => {
    try {
      window.localStorage.removeItem(keyN)
      setAvatarList(useOnUpdateAvatarList())  // Refresh list after deletion
      setAvatarOptions(defaultRobot)          // Reset creator to default state
      setIsEditing(false)                     // Exit edit mode if active
      showAlert(`Successfully deleted ${name}`, 'success')
    } catch(error){
      console.log(error)
      showAlert('Unable to delete robot. Sorry.', 'error')
    }
  }

  return (
      <li key={keyName} className="avatar_item_container">
        {/* Avatar preview image with performance optimizations */}
        <span className="item_avatar">
          <img
            src={url}
            alt={`${name} Avatar`}
            loading="lazy"      // Defer loading of off-screen images
            decoding="async"    // Allow asynchronous image decoding
          />
        </span>
        <span className="avatar_item_name">{name}</span>
        {/* Edit and delete controls */}
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