import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { useEffect, useState, useContext } from 'react'
import { useOnUpdateAvatarList } from './Hooks'
import { AvatarContext, AvatarURLContext, AvatarListContext, AlertContext, EditingContext } from './context'
import { generateKey,buildURL, defaultRobot } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'
import ResetButton from './components/UI/ResetButton'
import { AvatarListItem, AvatarOptions } from './Types'

function App() {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(defaultRobot)
  const [avatarList, setAvatarList] = useState<AvatarListItem[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [shouldResetTabs, setShouldResetTabs] = useState(false)
  const { isEditing, setIsEditing } = useContext(EditingContext)

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

  const handleReset = () => {
    setAvatarOptions(defaultRobot)
    setShouldResetTabs(true)
    setTimeout(() => {
      setShouldResetTabs(false)
    }, 100)
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
      // when editing an avatar later, we need all these properties to recreate the exact same avatar. If we only stored the URL and name, we wouldn't have the individual options that make up the avatar.
       window.localStorage.setItem(generateKey(name), JSON.stringify({
        URL: url,
        name: name,
        baseColor: avatarOptions.baseColor,
        backgroundColor: avatarOptions.backgroundColor,
        eyes: avatarOptions.eyes,
        face: avatarOptions.face,
        mouth: avatarOptions.mouth,
        sides: avatarOptions.sides,
        texture: avatarOptions.texture,
        top: avatarOptions.top, 
        key: generateKey(name)
      }))
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

  const updateAvatar = async (avatarOptions: AvatarOptions) => {
    setIsSaving(true)
    try {
      // Get the existing item from localStorage using the key
      const existingItem = window.localStorage.getItem(avatarOptions.key)
      if (!existingItem) {
        showAlert('Avatar not found. Please try again.', 'error')
        return
      }

      // Update the item in localStorage with new options
      window.localStorage.setItem(avatarOptions.key, JSON.stringify({
        ...JSON.parse(existingItem),
        ...avatarOptions,
        URL: buildURL(avatarOptions)
      }))

      setAvatarList(useOnUpdateAvatarList())
      setAvatarOptions(defaultRobot)
      setShouldResetTabs(true)
      showAlert('Avatar updated successfully!', 'success')
    } catch(error) {
      console.error('Error updating avatar:', error)
      showAlert('Failed to update avatar. Please try again.', 'error')
    } finally {
      setIsSaving(false)
      setIsEditing(false)
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
                          if (avatarOptions?.name && !isEditing) {
                            saveAvatar(buildURL(avatarOptions), avatarOptions.name)
                          } else if (avatarOptions?.name && isEditing) {
                            updateAvatar(avatarOptions)
                          }
                        }}
                        isLoading={isSaving}
                      >
                        {isSaving ? '...' : '+'}
                      </SaveButton>
                      <ResetButton
                        handleOnClick={handleReset}
                      >
                        ↺
                      </ResetButton>
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
                              onEdit={(key) => {
                                const item = localStorage.getItem(key)
                                if (item) {
                                  const avatarData = JSON.parse(item)
                                  setAvatarOptions({
                                    ...avatarData,
                                    key: key
                                  })
                                  setIsEditing(true)
                                }
                              }}
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
