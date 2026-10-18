import { Alert, Empty, Layout } from 'antd'
import { ChatSidebar } from '../../widgets/chat-sidebar'
import { Conversation } from '../../widgets/conversation'
import { useReceiveMessages } from '../../features/receive-messages'
import { useChatStore } from '../../entities/chat'
import type { GreenApiCredentials } from '../../shared/api'
import styles from './ChatPage.module.css'

const { Content } = Layout

interface ChatPageProps {
  credentials: GreenApiCredentials
  onLogout: () => void
}

export function ChatPage({ credentials, onLogout }: ChatPageProps) {
  const connectionStatus = useReceiveMessages(credentials)
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const activeChat = chats.find((chat) => chat.id === activeChatId)

  return (
    <Layout className={styles.layout}>
      <ChatSidebar credentials={credentials} onLogout={onLogout} hidden={Boolean(activeChat)} />
      <Layout className={activeChat ? undefined : styles.conversationHidden}>
        {connectionStatus === 'reconnecting' && (
          <Alert type="warning" banner showIcon title="Нет соединения с GREEN-API. Повторная попытка..." />
        )}
        {activeChat ? (
          <Conversation chat={activeChat} credentials={credentials} />
        ) : (
          <Content className={styles.contentCentered}>
            <Empty description="Выберите чат или создайте новый" />
          </Content>
        )}
      </Layout>
    </Layout>
  )
}
