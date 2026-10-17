import { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { useChatStore } from '../../../entities/chat'

const PHONE_PATTERN = /^\d{10,15}$/

export function NewChatButton() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm<{ phone: string }>()
  const addChat = useChatStore((state) => state.addChat)

  function handleFinish(values: { phone: string }) {
    addChat(values.phone)
    form.resetFields()
    setOpen(false)
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
        cancelText="Отмена"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
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
