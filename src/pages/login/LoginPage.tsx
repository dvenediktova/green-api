import { LoginForm } from '../../features/auth'
import type { GreenApiCredentials } from '../../entities/instance'

interface LoginPageProps {
  onLogin: (credentials: GreenApiCredentials) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return <LoginForm onLogin={onLogin} />
}
