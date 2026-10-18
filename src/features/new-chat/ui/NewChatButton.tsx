import { useState } from 'react'
import { Button, Form, Input, Modal, message as antdMessage } from 'antd'
import { checkAccount } from '../../../entities/instance'
import { useChatStore } from '../../../entities/chat'
import type { GreenApiCredentials } from '../../../shared/api'

const PHONE_PATTERN = /^\d{10,15}$/

interface NewChatButtonProps {
  credentials: GreenApiCredentials
}

export function NewChatButton({ credentials }: NewChatButtonProps) {
  const [open, setOpen] = useState(false)
  const [checking, setChecking] = useState(false)
  const [form] = Form.useForm<{ phone: string }>()
  const addChat = useChatStore((state) => state.addChat)

  async function handleFinish(values: { phone: string }) {
    setChecking(true)
    try {
      const result = await checkAccount(credentials, values.phone)
      if (!result.exist || !result.chatId) {
        antdMessage.error('У этого номера нет аккаунта Telegram')
        return
      }
      addChat(result.chatId, values.phone)
      form.resetFields()
      setOpen(false)
    } catch {
      antdMessage.error('Не удалось проверить номер. Проверьте соединение')
    } finally {
      setChecking(false)
    }
  }

  return (
    <>
      <Button type="primary" block onClick={() => setOpen(true)}>
        Новый чат
      </Button>
      <Modal
        title="Новый чат"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Создать"
        okButtonProps={{ loading: checking }}
        cancelText="Отмена"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} disabled={checking}>
          <Form.Item
            label="Номер телефона"
            name="phone"
            rules={[
              { required: true, message: 'Введите номер телефона' },
              { pattern: PHONE_PATTERN, message: 'Номер должен содержать 10–15 цифр' },
            ]}
          >
            <Input placeholder="79991234567" autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
