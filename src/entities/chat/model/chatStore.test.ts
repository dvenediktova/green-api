import { beforeEach, describe, expect, it } from 'vitest'
import { useChatStore } from './chatStore'

beforeEach(() => {
  useChatStore.setState({ chats: [], activeChatId: null })
})

describe('chatStore', () => {
  it('addChat creates a chat keyed by the resolved chatId, not the raw phone', () => {
    const id = useChatStore.getState().addChat('10000000', '79991234567')
    expect(id).toBe('10000000')
    expect(useChatStore.getState().chats).toEqual([
      { id: '10000000', phone: '79991234567', messages: [] },
    ])
  })

  it('addChat reuses an existing chat with the same chatId', () => {
    useChatStore.getState().addChat('10000000', '79991234567')
    useChatStore.getState().addChat('10000000', '79991234567')
    expect(useChatStore.getState().chats).toHaveLength(1)
  })

  it('ensureChat matches an incoming chatId to a chat created from checkAccount, even if it differs from the phone digits', () => {
    useChatStore.getState().addChat('10000000', '79991234567')
    const id = useChatStore.getState().ensureChat('10000000')
    expect(id).toBe('10000000')
    expect(useChatStore.getState().chats).toHaveLength(1)
  })

  it('ensureChat creates a new chat for an unseen chatId', () => {
    const id = useChatStore.getState().ensureChat('-10000000000000')
    expect(useChatStore.getState().chats).toEqual([
      { id: '-10000000000000', phone: '-10000000000000', messages: [] },
    ])
    expect(id).toBe('-10000000000000')
  })
})
