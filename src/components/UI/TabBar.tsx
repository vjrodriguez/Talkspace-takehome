import { TabData } from '../../Types'
import { AvatarOptions } from '../../Types'
import '../../styles/UI/tabBar.css'
import { useState } from 'react'

type AvatarKey = keyof Exclude<AvatarOptions, undefined>;

interface Props {
  tabData: TabData[]
  handleOnClick: (e?: AvatarKey) => void 
}

const TabBar = (props: Props) => {
  const {tabData, handleOnClick} = props
  const [activeTab, setActiveTab] = useState<AvatarKey>(tabData[0].option as AvatarKey)
  
  const onClick = () => {
    const et:any = event?.target;
    setActiveTab(et.value as AvatarKey)
    handleOnClick(et.value as AvatarKey)
  }

  return (
    <>
      <div className="tab">
        {tabData.map((tab, i) => {
            const isActive = activeTab === tab.option as AvatarKey
            return <button
                      key= {`tab_${i}`}
                      value = {tab.option} 
                      className = {isActive ? "active" : "" }
                      onClick={() => onClick()}>
                        {tab.label}
                      </button>
          }
        )}
      </div>
    </>
  )
} 

export default TabBar