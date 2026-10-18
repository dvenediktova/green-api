import { useEffect, useRef } from 'react'
import { Avatar, Empty, Layout, Space, Typography } from 'antd'
import { UserOutlined, CheckOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { MessageInput } from '../../../features/send-message'
import type { Chat, MessageStatus } from '../../../entities/chat'
import type { GreenApiCredentials } from '../../../shared/api'
import styles from './Conversation.module.css'

const { Header, Content } = Layout

interface ConversationProps {
  chat: Chat
  credentials: GreenApiCredentials
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function MessageStatusIcon({ status }: { status: MessageStatus }) {
  if (status === 'pending') return <ClockCircleOutlined className={styles.statusIcon} />
  if (status === 'error') return <ExclamationCircleOutlined className={styles.statusIconError} />
  if (status === 'delivered' || status === 'read') {
    return (
      <span className={`${styles.doubleCheck} ${status === 'read' ? styles.statusIconRead : styles.statusIcon}`}>
        <CheckOutlined />
        <CheckOutlined />
      </span>
    )
  }
  return <CheckOutlined className={styles.statusIcon} />
}

export function Conversation({ chat, credentials }: ConversationProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' })
  }, [chat.id, chat.messages.length])

  return (
    <>
      <Header className={styles.header}>
        <Avatar icon={<UserOutlined />} className={styles.headerAvatar} />
        <Typography.Text strong>{chat.phone}</Typography.Text>
      </Header>
      <Content className={styles.content}>
        {chat.messages.length === 0 ? (
          <Empty description="Нет сообщений. Напишите первое!" className={styles.emptyMessages} />
        ) : (
          <Space orientation="vertical" className={styles.messageList} size={8}>
            {chat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${msg.direction === 'out' ? styles.messageRowOut : styles.messageRowIn}`}
              >
                <div className={`${styles.bubble} ${msg.direction === 'out' ? styles.bubbleOut : styles.bubbleIn}`}>
                  <Typography.Text className={styles.bubbleText}>{msg.text}</Typography.Text>
                  <span className={styles.bubbleMeta}>
                    {formatTime(msg.timestamp)}
                    {msg.direction === 'out' && <MessageStatusIcon status={msg.status} />}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Space>
        )}
      </Content>
      <MessageInput chatId={chat.id} credentials={credentials} />
    </>
  )
}
