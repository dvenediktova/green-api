import { Avatar, Button, Empty, Layout, Space, Typography } from 'antd'
import { UserOutlined, CheckOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { ChatList } from '../../features/chat-list'
import { NewChatButton } from '../../features/new-chat'
import { MessageInput } from '../../features/send-message'
import { useChatStore } from '../../entities/chat'
import type { GreenApiCredentials } from '../../entities/instance'

const { Sider, Header, Content } = Layout

interface ChatPageProps {
  credentials: GreenApiCredentials
  onLogout: () => void
}

function MessageStatusIcon({ status }: { status: 'pending' | 'sent' | 'error' }) {
  if (status === 'pending') return <ClockCircleOutlined style={{ fontSize: 12, opacity: 0.6 }} />
  if (status === 'error') return <ExclamationCircleOutlined style={{ fontSize: 12, color: '#ff4d4f' }} />
  return <CheckOutlined style={{ fontSize: 12, opacity: 0.6 }} />
}

export function ChatPage({ credentials, onLogout }: ChatPageProps) {
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
              <Space direction="vertical" style={{ width: '100%' }} size={8}>
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.direction === 'out' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '60%',
                        padding: '8px 12px',
                        borderRadius: 12,
                        background: msg.direction === 'out' ? '#95ec69' : '#fff',
                      }}
                    >
                      <Typography.Text>{msg.text}</Typography.Text>
                      {msg.direction === 'out' && (
                        <span style={{ marginLeft: 6 }}>
                          <MessageStatusIcon status={msg.status} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </Space>
            </Content>
            <MessageInput chatId={activeChat.id} credentials={credentials} />
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
