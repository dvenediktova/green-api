import axios from 'axios'
import { instanceUrl } from '../../../shared/api/client'
import type { GreenApiCredentials } from '../../../shared/api/types'

export async function sendMessage(
  credentials: GreenApiCredentials,
  chatId: string,
  message: string,
): Promise<{ idMessage: string }> {
  const { idInstance, apiTokenInstance } = credentials
  const { data } = await axios.post(instanceUrl(idInstance, apiTokenInstance, 'sendMessage'), {
    chatId,
    message,
  })
  return data
}
