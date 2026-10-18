import { Button, Layout } from 'antd'
import { ChatList } from '../../../features/chat-list'
import { NewChatButton } from '../../../features/new-chat'
import type { GreenApiCredentials } from '../../../shared/api'
import { useIsMobile } from '../../../shared/lib'
import styles from './ChatSidebar.module.css'

const { Sider } = Layout

const SIDER_WIDTH = 320

interface ChatSidebarProps {
  credentials: GreenApiCredentials
  onLogout: () => void
  hidden?: boolean
}

export function ChatSidebar({ credentials, onLogout, hidden }: ChatSidebarProps) {
  const isMobile = useIsMobile()

  if (hidden && isMobile) return null

  return (
    <Sider width={isMobile ? '100%' : SIDER_WIDTH} className={styles.sider}>
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
