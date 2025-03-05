import { PropsWithChildren } from 'react'
import '../../styles/UI/SaveButton.css'

interface Props {
  disabled: boolean
  handleOnClick: ()=>void
  isLoading?: boolean
}

const SaveButton = (props:PropsWithChildren<Props>) => {
  const {children, disabled, handleOnClick, isLoading} = props
  
  return (
    <>
      <button
        className="save_button"
        disabled={disabled}
        onClick={handleOnClick}
        title="Save avatar"
        aria-label="Save avatar"
      >
        <span className={isLoading ? 'loading' : ''}>
          {children}
        </span>
      </button>
    </>
  )
}

export default SaveButton