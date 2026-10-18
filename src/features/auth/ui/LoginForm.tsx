import { useState } from 'react'
import { Button, Card, Form, Input, Typography, Alert } from 'antd'
import axios from 'axios'
import { getSettings } from '../../../entities/instance'
import type { GreenApiCredentials } from '../../../entities/instance'
import styles from './LoginForm.module.css'

interface LoginFormProps {
  onLogin: (credentials: GreenApiCredentials) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(values: GreenApiCredentials) {
    setError(null)
    setLoading(true)
    try {
      await getSettings(values)
      onLogin(values)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Неверные idInstance или apiTokenInstance')
      } else {
        setError('Не удалось подключиться к GREEN-API. Проверьте данные и соединение')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Typography.Title level={4} className={styles.title}>
          Вход в GREEN-API
        </Typography.Title>
        <Form layout="vertical" onFinish={handleSubmit} disabled={loading}>
          <Form.Item
            label="idInstance"
            name="idInstance"
            rules={[{ required: true, message: 'Введите idInstance' }]}
          >
            <Input placeholder="1101000001" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="apiTokenInstance"
            name="apiTokenInstance"
            rules={[{ required: true, message: 'Введите apiTokenInstance' }]}
          >
            <Input.Password placeholder="d75b3a66374942c5b3c019c698abc2067e151558..." autoComplete="off" />
          </Form.Item>
          {error && <Alert type="error" title={error} className={styles.error} />}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
