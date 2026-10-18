import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NewChatButton } from './NewChatButton'

describe('NewChatButton', () => {
  it('renders the trigger button with a closed modal', () => {
    const { container } = render(<NewChatButton />)
    expect(container).toMatchSnapshot()
  })
})
