import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { useEffect, useState, useContext } from 'react'
import { useOnUpdateAvatarList } from './Hooks'
import { AvatarContext, AvatarURLContext, AvatarListContext, AlertContext } from './context'
import { generateKey,buildURL, defaultRobot } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'
import { AvatarListItem, AvatarOptions } from './Types'

function App() {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(defaultRobot)
  const [avatarList, setAvatarList] = useState<AvatarListItem[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [shouldResetTabs, setShouldResetTabs] = useState(false)

  const { showAlert } = useContext(AlertContext)

  // could also memoize to prevent unnecessary re-renders like: 
  // const memoizedAvatarList = useMemo(() => useOnUpdateAvatarList(), []); 
  // if using memoization we call setAvatarList with the memoized value
  useEffect(() => {
    const storedAvatars = useOnUpdateAvatarList()
    setAvatarList(storedAvatars)
  }, [])

  const nameExists = (name: string) => {
    return avatarList.some(avatar => avatar.name.toLowerCase() === name.toLowerCase())
  }

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setAvatarOptions((prev) => {
      return ({
        ...prev,
        name: newName
      })
    })
  }

  const saveAvatar = async (url: string, name: string) => {
    if (nameExists(name)) {
      showAlert('This name already exists. Please choose a different name.', 'warning')
      return
    }

    setIsSaving(true)
    try {
      // to test the loading state/mimic an API call uncomment the following line since localStorage is instantaneous
      // await new Promise(resolve => setTimeout(resolve, 500))
      window.localStorage.setItem(generateKey(name), JSON.stringify({URL:url, name:name}))
      setAvatarList(useOnUpdateAvatarList())
      setAvatarOptions(defaultRobot)
      setShouldResetTabs(true)
      showAlert(`Avatar ${name} saved successfully!`, 'success')
    } catch(error) {
      console.error('Error saving avatar:', error)
      showAlert('Failed to save avatar. Please try again.', 'error')
    } finally {
      setIsSaving(false)
      setTimeout(() => {
        setShouldResetTabs(false)
      }, 100)
    }
  }

  return (
    <div className="app_container">
      <AvatarContext.Provider value = {{avatarOptions, setAvatarOptions}}>
        <AvatarURLContext.Provider value = {buildURL(avatarOptions)}>
          <AvatarListContext.Provider value = {{avatarList, setAvatarList}}>
                <div className="main">
                  <div className="avatar_creator">
                    <AvatarPreview />
                    <div className="name-row"> 
                      <TextInput 
                        label=""
                        value={avatarOptions?.name || "" }
                        name="avatar_name"
                        placeholder="Name Me!" 
                        handleOnChange={(e) => updateName(e)}
                      />
                      <SaveButton
                        disabled={!avatarOptions?.name || isSaving} 
                        handleOnClick={() => {
                          if (avatarOptions?.name) {
                            saveAvatar(buildURL(avatarOptions), avatarOptions.name)
                          }
                        }}
                        isLoading={isSaving}
                      >
                        {isSaving ? '...' : '+'}
                      </SaveButton>
                    </div>
                    <div className="row">
                      <ColorPicker
                        label="Color"
                        defaultColor={`#${avatarOptions?.baseColor}`}
                        optionKey="baseColor"
                      />
                      <ColorPicker
                        label="Background"
                        defaultColor={`#${avatarOptions?.backgroundColor}`}
                        optionKey="backgroundColor"
                      />
                    </div>
                    <OptionsPicker shouldReset={shouldResetTabs}/>
                  </div>
                  <div className="avatar_list">
                    <ul>
                      {avatarList && [...avatarList]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((avatar) => {
                          return (
                            <RobotListItem
                              keyName={avatar.key}
                              name={avatar.name}
                              url={avatar.URL} 
                              key={avatar.key}
                            />
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
          </AvatarListContext.Provider>  
        </AvatarURLContext.Provider>
      </AvatarContext.Provider>
    </div>
  )
}

export default App
