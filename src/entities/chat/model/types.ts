export type MessageStatus = 'pending' | 'sent' | 'error'

export interface ChatMessage {
  id: string
  text: string
  direction: 'out' | 'in'
  timestamp: number
  status: MessageStatus
}

export interface Chat {
  id: string
  phone: string
  messages: ChatMessage[]
}
