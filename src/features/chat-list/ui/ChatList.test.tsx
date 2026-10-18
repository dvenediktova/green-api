import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ChatList } from './ChatList'
import { useChatStore } from '../../../entities/chat'

beforeEach(() => {
  useChatStore.setState({ chats: [], activeChatId: null })
})

describe('ChatList', () => {
  it('renders empty state', () => {
    const { container } = render(<ChatList />)
    expect(container).toMatchSnapshot()
  })

  it('renders a chat with a last message', () => {
    useChatStore.setState({
      chats: [
        {
          id: '79991234567',
          phone: '79991234567',
          messages: [
            { id: 'm1', text: 'Привет!', direction: 'in', timestamp: 1700000000000, status: 'sent' },
          ],
        },
      ],
      activeChatId: '79991234567',
    })
    const { container } = render(<ChatList />)
    expect(container).toMatchSnapshot()
  })
})
