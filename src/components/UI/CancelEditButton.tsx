import { PropsWithChildren } from 'react'
import '../../styles/UI/CancelEditButton.css'

interface Props {
  handleOnClick: () => void
}

const CancelEditButton = (props: PropsWithChildren<Props>) => {
  const { children, handleOnClick } = props
  
  return (
    <>
      <button
        className="cancel_edit_button"
        onClick={handleOnClick}
        title="Cancel editing"
        aria-label="Cancel editing"
      >
        <span>
          {children}
        </span>
      </button>
    </>
  )
}

export default CancelEditButton 