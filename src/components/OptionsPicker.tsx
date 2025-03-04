import '../styles/optionsPicker.css'
import TabBar from './UI/TabBar'
import { CustomizationOptions, TabData, AvatarOptions } from '../Types'
import { customizationOptions } from '../Services'
import { useState } from 'react'
import { buildURL } from '../Services'
import { useContext } from 'react'
import { AvatarContext } from '../context'

type AvatarKey = keyof Exclude<AvatarOptions, undefined>;

const OptionsPicker = () => {
  
  const {avatarOptions, setAvatarOptions} = useContext(AvatarContext)
  const [activeTab, setActiveTab] = useState<AvatarKey>(customizationOptions[0].option as AvatarKey)
  const [displayOptions, setDisplayOptions] = useState(customizationOptions[0].values)
  const tabData:TabData[] = customizationOptions.map( (tab:TabData) => 
    ({label: tab.label, option: tab.option })
  )

  const handleOnClick = (option?: AvatarKey) => {
    if (option) {
      setActiveTab(option)
      const optionValues = getDisplayOptions(customizationOptions, option)
      setDisplayOptions(optionValues)
    }
  }

  const getDisplayOptions = (customizationOptions:CustomizationOptions[], option: AvatarKey) => {
    for(let i = 0; i <=  customizationOptions.length; i++) {
      if (customizationOptions[i].option === option) {
        return (
          customizationOptions[i].values
        )
      }
    }
    return customizationOptions[0].values
  }

  const updateAvatar = (optKey: AvatarKey, value: string) => {
    if (!avatarOptions) return
    const _O = {...avatarOptions}
    _O[optKey] = value
    setAvatarOptions(_O)
  }

  return (
    <div className="options_picker_container">
      <TabBar
        tabData = {tabData}
        handleOnClick = {handleOnClick}
      />
      <div className="options_examples">
          {displayOptions.map((opt, i) => {
            return (
              <div
                key={ `{opt_${i}}`} 
                className="option_selection"
                onClick = {() => {updateAvatar(activeTab, opt)}}
                >
                <img
                  src={buildURL(avatarOptions, {name: activeTab, value: opt})}
                  alt="avatar"
                />
              </div>
            )
          })
          }
      </div>
    </div>  
  )
}

export default OptionsPicker