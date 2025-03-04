import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { useState } from 'react'
import { useOnUpdateAvatarList } from './Hooks'
import { AvatarContext, AvatarURLContext, AvatarListContext } from './context'
import { generateKey,buildURL, defaultRobot } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'


function App() {

  const [avatarOptions, setAvatarOptions] = useState(defaultRobot)
  const [avatarList, setAvatarList] = useState(useOnUpdateAvatarList)

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!avatarOptions) return
    const _O = {...avatarOptions} as NonNullable<typeof avatarOptions>
    _O.name = e.target.value
    setAvatarOptions(_O)    
  }

  const saveAvatar = (url:string, name: string) => {
    console.log(event?.target)
    try{
      console.log("fire!!!")
      window.localStorage.setItem(generateKey(name), JSON.stringify({URL:url, name:name}))
      setAvatarList(useOnUpdateAvatarList())
      setAvatarOptions(defaultRobot)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="app_container">
      <AvatarContext.Provider value = {{avatarOptions, setAvatarOptions}}>
        <AvatarURLContext.Provider value = {buildURL(avatarOptions)}>
          <AvatarListContext.Provider value = {{avatarList, setAvatarList}}>

            <div className="main">
              <div className="avatar_creator">
              <SaveButton
                  disabled={!avatarOptions?.name} 
                  handleOnClick={() => {
                    if (avatarOptions?.name) {
                      saveAvatar(buildURL(avatarOptions), avatarOptions.name)
                    }
                  }}
                >+</SaveButton>

                <AvatarPreview
                />
                <div className="row">
                  <TextInput 
                    label=""
                    value={avatarOptions?.name || "" }
                    name="avatar_name"
                    placeholder="Name Me!" 
                    handleOnChange={updateName}
                  />
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
                <OptionsPicker/>
              </div>
              <div className="avatar_list">
                <ul>
                  { avatarList && avatarList.map((avatar) => {
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
