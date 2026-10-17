import { useAuthStore } from '../features/auth'
import { LoginPage } from '../pages/login'
import { ChatPage } from '../pages/chat'

function App() {
  const credentials = useAuthStore((state) => state.credentials)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  if (!credentials) {
    return <LoginPage onLogin={login} />
  }

  return <ChatPage onLogout={logout} />
}

export default App
