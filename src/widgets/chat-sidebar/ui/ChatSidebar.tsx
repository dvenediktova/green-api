import { Button, Layout } from 'antd'
import { ChatList } from '../../../features/chat-list'
import { NewChatButton } from '../../../features/new-chat'
import type { GreenApiCredentials } from '../../../shared/api'
import styles from './ChatSidebar.module.css'

const { Sider } = Layout

interface ChatSidebarProps {
  credentials: GreenApiCredentials
  onLogout: () => void
}

export function ChatSidebar({ credentials, onLogout }: ChatSidebarProps) {
  return (
    <Sider width={320} className={styles.sider}>
      <div className={styles.top}>
        <NewChatButton credentials={credentials} />
      </div>
      <div className={styles.list}>
        <ChatList />
      </div>
      <div className={styles.bottom}>
        <Button block onClick={onLogout}>
          Выйти
        </Button>
      </div>
    </Sider>
  )
}
