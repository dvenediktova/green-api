import { List, Typography } from 'antd'
import { useChatStore } from '../../../entities/chat'

export function ChatList() {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const setActiveChat = useChatStore((state) => state.setActiveChat)

  if (chats.length === 0) {
    return (
      <Typography.Text type="secondary" style={{ padding: 16, display: 'block' }}>
        Нет чатов
      </Typography.Text>
    )
  }

  return (
    <List
      dataSource={chats}
      renderItem={(chat) => (
        <List.Item
          onClick={() => setActiveChat(chat.id)}
          style={{
            padding: '12px 16px',
            cursor: 'pointer',
            background: chat.id === activeChatId ? '#e6f4ff' : undefined,
          }}
        >
          <Typography.Text>{chat.phone}</Typography.Text>
        </List.Item>
      )}
    />
  )
}
