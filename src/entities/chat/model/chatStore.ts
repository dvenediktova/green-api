import { create } from 'zustand'
import type { Chat } from './types'

interface ChatState {
  chats: Chat[]
  activeChatId: string | null
  addChat: (phone: string) => string
  setActiveChat: (id: string) => void
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
  setActiveChat: (id) => set({ activeChatId: id }),
}))
