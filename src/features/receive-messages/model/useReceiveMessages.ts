import { useEffect } from 'react'
import { deleteNotification, receiveNotification } from '../../../entities/message'
import { useChatStore } from '../../../entities/chat'
import type { GreenApiCredentials } from '../../../entities/instance'

const RETRY_DELAY_MS = 2000
const MAX_RETRY_DELAY_MS = 30000

export function useReceiveMessages(credentials: GreenApiCredentials) {
  const ensureChat = useChatStore((state) => state.ensureChat)
  const addMessage = useChatStore((state) => state.addMessage)

  useEffect(() => {
    let stopped = false
    let retryDelay = RETRY_DELAY_MS

    async function poll() {
      while (!stopped) {
        try {
          const notification = await receiveNotification(credentials)
          retryDelay = RETRY_DELAY_MS

          if (!notification) continue

          const { receiptId, body } = notification
          if (body.typeWebhook === 'incomingMessageReceived') {
            const chatId = body.senderData?.chatId
            const text = body.messageData?.textMessageData?.textMessage
            if (chatId && text) {
              const id = ensureChat(chatId)
              addMessage(id, text, 'in')
            }
          }

          await deleteNotification(credentials, receiptId)
        } catch {
          if (stopped) return
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
          retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY_MS)
        }
      }
    }

    poll()

    return () => {
      stopped = true
    }
  }, [credentials, ensureChat, addMessage])
}
