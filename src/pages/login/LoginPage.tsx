import { LoginForm } from '../../features/auth'
import type { GreenApiCredentials } from '../../shared/api'

interface LoginPageProps {
  onLogin: (credentials: GreenApiCredentials) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return <LoginForm onLogin={onLogin} />
}
