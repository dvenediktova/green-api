export type OutgoingMessageDeliveryStatus = 'sent' | 'delivered' | 'read' | 'failed' | 'noAccount'

export interface IncomingMessageNotification {
  typeWebhook: string
  timestamp: number
  idMessage?: string
  chatId?: string
  status?: OutgoingMessageDeliveryStatus
  senderData?: {
    chatId: string
    sender: string
    senderName?: string
  }
  messageData?: {
    typeMessage: string
    textMessageData?: {
      textMessage: string
    }
  }
}

export interface ReceiveNotificationResponse {
  receiptId: number
  body: IncomingMessageNotification
}
