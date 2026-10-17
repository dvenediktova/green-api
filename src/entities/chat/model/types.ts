export interface ChatMessage {
  id: string
  text: string
  direction: 'out' | 'in'
  timestamp: number
}

export interface Chat {
  id: string
  phone: string
  messages: ChatMessage[]
}
