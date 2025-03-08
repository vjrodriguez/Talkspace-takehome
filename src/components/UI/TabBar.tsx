import { TabData, AvatarOptions } from '../../Types'
import '../../styles/UI/tabBar.css'
import { useState, useEffect } from 'react'

type AvatarKey = Exclude<keyof AvatarOptions, 'name' | 'key'>;

interface Props {
  tabData: TabData[]
  handleOnClick: (e?: AvatarKey) => void
  shouldReset?: boolean
}

const TabBar = (props: Props) => {
  const {tabData, handleOnClick, shouldReset} = props
  const [activeTab, setActiveTab] = useState<AvatarKey>(tabData[0].option as AvatarKey)
  
  useEffect(() => {
    if (shouldReset) {
      setActiveTab(tabData[0].option as AvatarKey)
      handleOnClick(tabData[0].option as AvatarKey)
    }
  }, [shouldReset, tabData, handleOnClick])

  const onClick = (option: string) => {
    setActiveTab(option as AvatarKey)
    handleOnClick(option as AvatarKey)
  }

  return (
    <>
      <div className="tab">
        {tabData.map((tab, i) => {
            const isActive = activeTab === tab.option as AvatarKey
            return <button
                      key={`tab_${i}`}
                      value={tab.option} 
                      className={isActive ? "active" : ""}
                      onClick={() => onClick(tab.option)}>
                        {tab.label}
                      </button>
          }
        )}
      </div>
    </>
  )
} 

export default TabBar