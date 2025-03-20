import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SaveButton from './SaveButton'

describe('SaveButton', () => {
  it('renders with children', () => {
    render(
      <SaveButton disabled={false} handleOnClick={() => {}}>
        +
      </SaveButton>
    )
    expect(screen.getByText('+')).toBeInTheDocument()
  })

  it('calls handleOnClick when clicked', () => {
    const handleClick = vi.fn()
    render(
      <SaveButton disabled={false} handleOnClick={handleClick}>
        +
      </SaveButton>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <SaveButton disabled={true} handleOnClick={() => {}}>
        +
      </SaveButton>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies loading class when isLoading is true', () => {
    render(
      <SaveButton disabled={false} handleOnClick={() => {}} isLoading={true}>
        ...
      </SaveButton>
    )
    expect(screen.getByRole('button')).toHaveClass('loading')
  })
}) 