import { useOnUpdateAvatarList } from './../Hooks'
import { useContext } from 'react'
import { AlertContext, AvatarListContext } from './../context'
import '../styles/robotListItem.css'

interface Props {
  keyName: string
  name: string 
  url: string
}

const RobotListItem = (props: Props) => {
  const {keyName, name, url} = props
  const {setAvatarList} = useContext(AvatarListContext)
  const {showAlert} = useContext(AlertContext)

  const deleteAvatar = (keyN:string) => {
    try {
      window.localStorage.removeItem(keyN)
      setAvatarList(useOnUpdateAvatarList())
      showAlert(`Successfully deleted ${name}.`, 'success')
    } catch(error){
      console.log(error)
      showAlert('Unable to delete robot. Please try again later.', 'error')
    }
  }

  return (
    <>
      <li key={keyName} className="avatar_item_container">
        <span className="item_avatar">
          <img
            src={url}
            alt={`${name} Avatar`}
            // Enables lazy loading of images and improve performance when multiple images are being loaded
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="avatar_item_name">{name}</span>
        <button 
          className="avatar_delete"
          onClick={() => deleteAvatar(keyName)}
          >X</button>
      </li>
    </>
  )
}

export default RobotListItem