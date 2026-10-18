import { useState } from 'react'
import { Button, Input, message as antdMessage } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import axios from 'axios'
import { sendMessage } from '../../../entities/message'
import { useChatStore } from '../../../entities/chat'
import type { GreenApiCredentials } from '../../../shared/api'
import styles from './MessageInput.module.css'

interface MessageInputProps {
  chatId: string
  credentials: GreenApiCredentials
}

export function MessageInput({ chatId, credentials }: MessageInputProps) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const addMessage = useChatStore((state) => state.addMessage)
  const setMessageStatus = useChatStore((state) => state.setMessageStatus)

  async function handleSend() {
    const value = text.trim()
    if (!value || sending) return

    setSending(true)
    const messageId = addMessage(chatId, value, 'out')
    setText('')
    try {
      await sendMessage(credentials, chatId, value)
      setMessageStatus(chatId, messageId, 'sent')
    } catch (err) {
      setMessageStatus(chatId, messageId, 'error')
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        antdMessage.error('Не удалось отправить: неверный номер получателя')
      } else {
        antdMessage.error('Не удалось отправить сообщение. Проверьте соединение')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={styles.container}>
      <Input
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={handleSend}
        disabled={sending}
      />
      <Button type="primary" icon={<SendOutlined />} onClick={handleSend} loading={sending} disabled={!text.trim()} />
    </div>
  )
}
