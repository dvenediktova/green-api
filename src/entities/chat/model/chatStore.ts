import { create } from 'zustand'
import type { Chat, ChatMessage, MessageStatus } from './types'

interface ChatState {
  chats: Chat[]
  activeChatId: string | null
  addChat: (chatId: string, phone: string) => string
  ensureChat: (chatId: string) => string
  setActiveChat: (id: string | null) => void
  addMessage: (chatId: string, text: string, direction: ChatMessage['direction']) => string
  setMessageStatus: (chatId: string, messageId: string, status: MessageStatus) => void
  setMessageIdMessage: (chatId: string, messageId: string, idMessage: string) => void
  setMessageStatusByIdMessage: (chatId: string, idMessage: string, status: MessageStatus) => void
}

function displayPhone(chatId: string): string {
  return chatId.replace(/@.*$/, '')
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: null,
  addChat: (chatId, phone) => {
    const existing = get().chats.find((chat) => chat.id === chatId)
    if (existing) {
      set({ activeChatId: existing.id })
      return existing.id
    }
    const chat: Chat = { id: chatId, phone, messages: [] }
    set((state) => ({ chats: [...state.chats, chat], activeChatId: chatId }))
    return chatId
  },
  ensureChat: (chatId) => {
    const existing = get().chats.find((chat) => chat.id === chatId)
    if (existing) return existing.id
    const chat: Chat = { id: chatId, phone: displayPhone(chatId), messages: [] }
    set((state) => ({ chats: [...state.chats, chat] }))
    return chatId
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
  setMessageIdMessage: (chatId, messageId, idMessage) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.id === messageId ? { ...message, idMessage } : message,
              ),
            }
          : chat,
      ),
    }))
  },
  setMessageStatusByIdMessage: (chatId, idMessage, status) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.idMessage === idMessage ? { ...message, status } : message,
              ),
            }
          : chat,
      ),
    }))
  },
}))
