import { create } from 'zustand'
import type { Chat, ChatMessage, MessageStatus } from './types'

interface ChatState {
  chats: Chat[]
  activeChatId: string | null
  addChat: (phone: string) => string
  ensureChat: (chatId: string) => string
  setActiveChat: (id: string) => void
  addMessage: (chatId: string, text: string, direction: ChatMessage['direction']) => string
  setMessageStatus: (chatId: string, messageId: string, status: MessageStatus) => void
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: null,
  addChat: (phone) => {
    const id = normalizePhone(phone)
    const existing = get().chats.find((chat) => chat.id === id)
    if (existing) {
      set({ activeChatId: existing.id })
      return existing.id
    }
    const chat: Chat = { id, phone: id, messages: [] }
    set((state) => ({ chats: [...state.chats, chat], activeChatId: id }))
    return id
  },
  ensureChat: (chatId) => {
    const id = normalizePhone(chatId)
    const existing = get().chats.find((chat) => chat.id === id)
    if (existing) return existing.id
    const chat: Chat = { id, phone: id, messages: [] }
    set((state) => ({ chats: [...state.chats, chat] }))
    return id
  },
  setActiveChat: (id) => set({ activeChatId: id }),
  addMessage: (chatId, text, direction) => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      direction,
      timestamp: Date.now(),
      status: 'pending',
    }
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat,
      ),
    }))
    return message.id
  },
  setMessageStatus: (chatId, messageId, status) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.id === messageId ? { ...message, status } : message,
              ),
            }
          : chat,
      ),
    }))
  },
}))
