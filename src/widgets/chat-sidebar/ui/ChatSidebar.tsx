import { Button, Layout } from 'antd'
import { ChatList } from '../../../features/chat-list'
import { NewChatButton } from '../../../features/new-chat'
import styles from './ChatSidebar.module.css'

const { Sider } = Layout

interface ChatSidebarProps {
  onLogout: () => void
}

export function ChatSidebar({ onLogout }: ChatSidebarProps) {
  return (
    <Sider width={320} className={styles.sider}>
      <div className={styles.top}>
        <NewChatButton />
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
