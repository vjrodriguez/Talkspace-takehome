import { PropsWithChildren } from 'react'
import '../../styles/UI/ResetButton.css'

interface Props {
  handleOnClick: () => void
}

const ResetButton = (props: PropsWithChildren<Props>) => {
  const { children, handleOnClick } = props
  
  return (
    <>
      <button
        className="reset_button"
        onClick={handleOnClick}
        title="Reset avatar to default settings"
        aria-label="Reset avatar to default settings"
      >
        <span>
          {children}
        </span>
      </button>
    </>
  )
}

export default ResetButton 