import { Avatar, Button, Empty, Input, Layout, Typography } from 'antd'
import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { ChatList } from '../../features/chat-list'
import { NewChatButton } from '../../features/new-chat'
import { useChatStore } from '../../entities/chat'

const { Sider, Header, Content } = Layout

interface ChatPageProps {
  onLogout: () => void
}

export function ChatPage({ onLogout }: ChatPageProps) {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const activeChat = chats.find((chat) => chat.id === activeChatId)

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={320} style={{ background: '#fff', borderRight: '1px solid #f0f0f0', position: 'relative' }}>
        <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0' }}>
          <NewChatButton />
        </div>
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 129px)' }}>
          <ChatList />
        </div>
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
          <Button block onClick={onLogout}>
            Выйти
          </Button>
        </div>
      </Sider>
      <Layout>
        {activeChat ? (
          <>
            <Header
              style={{
                background: '#fff',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <Avatar icon={<UserOutlined />} />
              <Typography.Text strong>{activeChat.phone}</Typography.Text>
            </Header>
            <Content style={{ padding: 16, overflowY: 'auto', background: '#f5f5f5' }}>
              {activeChat.messages.length === 0 && <Empty description="Нет сообщений" style={{ marginTop: 80 }} />}
            </Content>
            <div
              style={{
                padding: 16,
                background: '#fff',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                gap: 8,
              }}
            >
              <Input placeholder="Введите сообщение..." disabled />
              <Button type="primary" icon={<SendOutlined />} disabled />
            </div>
          </>
        ) : (
          <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
            <Empty description="Выберите чат или создайте новый" />
          </Content>
        )}
      </Layout>
    </Layout>
  )
}
