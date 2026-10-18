import { Avatar, Empty, List, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useChatStore } from '../../../entities/chat'

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function ChatList() {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const setActiveChat = useChatStore((state) => state.setActiveChat)

  if (chats.length === 0) {
    return <Empty description="Нет чатов" style={{ marginTop: 40, padding: 16 }} />
  }

  return (
    <List
      dataSource={chats}
      renderItem={(chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1]
        return (
          <List.Item
            onClick={() => setActiveChat(chat.id)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              background: chat.id === activeChatId ? '#e6f4ff' : undefined,
            }}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<Typography.Text strong>{chat.phone}</Typography.Text>}
              description={
                lastMessage ? (
                  <Typography.Text type="secondary" ellipsis style={{ maxWidth: 180, display: 'inline-block' }}>
                    {lastMessage.direction === 'out' ? 'Вы: ' : ''}
                    {lastMessage.text}
                  </Typography.Text>
                ) : (
                  <Typography.Text type="secondary">Нет сообщений</Typography.Text>
                )
              }
            />
            {lastMessage && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {formatTime(lastMessage.timestamp)}
              </Typography.Text>
            )}
          </List.Item>
        )
      }}
    />
  )
}
