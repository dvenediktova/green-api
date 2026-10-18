import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders the login fields', () => {
    const { container } = render(<LoginForm onLogin={vi.fn()} />)
    expect(container).toMatchSnapshot()
  })
})
