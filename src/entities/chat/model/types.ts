export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'error'

export interface ChatMessage {
  id: string
  idMessage?: string
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
