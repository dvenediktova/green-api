export interface IncomingMessageNotification {
  typeWebhook: string
  timestamp: number
  idMessage?: string
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
