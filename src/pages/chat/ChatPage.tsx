import { useEffect, useRef } from 'react'
import { Alert, Avatar, Button, Empty, Layout, Space, Typography } from 'antd'
import { UserOutlined, CheckOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { ChatList } from '../../features/chat-list'
import { NewChatButton } from '../../features/new-chat'
import { MessageInput } from '../../features/send-message'
import { useReceiveMessages } from '../../features/receive-messages'
import { useChatStore } from '../../entities/chat'
import type { GreenApiCredentials } from '../../entities/instance'
import styles from './ChatPage.module.css'

const { Sider, Header, Content } = Layout

interface ChatPageProps {
  credentials: GreenApiCredentials
  onLogout: () => void
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function MessageStatusIcon({ status }: { status: 'pending' | 'sent' | 'error' }) {
  if (status === 'pending') return <ClockCircleOutlined className={styles.statusIcon} />
  if (status === 'error') return <ExclamationCircleOutlined className={styles.statusIconError} />
  return <CheckOutlined className={styles.statusIcon} />
}

export function ChatPage({ credentials, onLogout }: ChatPageProps) {
  const connectionStatus = useReceiveMessages(credentials)
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' })
  }, [activeChat?.id, activeChat?.messages.length])

  return (
    <Layout className={styles.layout}>
      <Sider width={320} className={styles.sider}>
        <div className={styles.siderTop}>
          <NewChatButton />
        </div>
        <div className={styles.siderList}>
          <ChatList />
        </div>
        <div className={styles.siderBottom}>
          <Button block onClick={onLogout}>
            Выйти
          </Button>
        </div>
      </Sider>
      <Layout>
        {connectionStatus === 'reconnecting' && (
          <Alert
            type="warning"
            banner
            showIcon
            title="Нет соединения с GREEN-API. Повторная попытка..."
          />
        )}
        {activeChat ? (
          <>
            <Header className={styles.header}>
              <Avatar icon={<UserOutlined />} className={styles.headerAvatar} />
              <Typography.Text strong>{activeChat.phone}</Typography.Text>
            </Header>
            <Content className={styles.content}>
              {activeChat.messages.length === 0 ? (
                <Empty description="Нет сообщений. Напишите первое!" className={styles.emptyMessages} />
              ) : (
                <Space orientation="vertical" className={styles.messageList} size={8}>
                  {activeChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.messageRow} ${msg.direction === 'out' ? styles.messageRowOut : styles.messageRowIn}`}
                    >
                      <div
                        className={`${styles.bubble} ${msg.direction === 'out' ? styles.bubbleOut : styles.bubbleIn}`}
                      >
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
            <MessageInput chatId={activeChat.id} credentials={credentials} />
          </>
        ) : (
          <Content className={styles.contentCentered}>
            <Empty description="Выберите чат или создайте новый" />
          </Content>
        )}
      </Layout>
    </Layout>
  )
}
