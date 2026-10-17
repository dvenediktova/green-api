import { Button, Typography } from 'antd'
import { useAuthStore } from '../features/auth'
import { LoginPage } from '../pages/login'

function App() {
  const credentials = useAuthStore((state) => state.credentials)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  if (!credentials) {
    return <LoginPage onLogin={login} />
  }

  return (
    <div style={{ padding: 24 }}>
      <Typography.Text>Авторизован как instance {credentials.idInstance}</Typography.Text>
      <div style={{ marginTop: 16 }}>
        <Button onClick={logout}>Выйти</Button>
      </div>
    </div>
  )
}

export default App
