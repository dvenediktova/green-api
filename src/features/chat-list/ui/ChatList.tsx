import { Avatar, Empty, Listy, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useChatStore } from '../../../entities/chat'
import type { Chat } from '../../../entities/chat'
import styles from './ChatList.module.css'

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function ChatList() {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const setActiveChat = useChatStore((state) => state.setActiveChat)

  if (chats.length === 0) {
    return <Empty description="Нет чатов" className={styles.empty} />
  }

  return (
    <Listy
      items={chats}
      rowKey="id"
      itemRender={(chat: Chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1]
        return (
          <div
            onClick={() => setActiveChat(chat.id)}
            className={`${styles.item} ${chat.id === activeChatId ? styles.itemActive : ''}`}
          >
            <Avatar icon={<UserOutlined />} />
            <div className={styles.itemMeta}>
              <Typography.Text strong>{chat.phone}</Typography.Text>
              {lastMessage ? (
                <Typography.Text type="secondary" ellipsis className={styles.preview}>
                  {lastMessage.direction === 'out' ? 'Вы: ' : ''}
                  {lastMessage.text}
                </Typography.Text>
              ) : (
                <Typography.Text type="secondary">Нет сообщений</Typography.Text>
              )}
            </div>
            {lastMessage && (
              <Typography.Text type="secondary" className={styles.time}>
                {formatTime(lastMessage.timestamp)}
              </Typography.Text>
            )}
          </div>
        )
      }}
    />
  )
}
