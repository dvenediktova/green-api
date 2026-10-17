import axios from 'axios'
import { instanceUrl, type GreenApiCredentials } from '../../../shared/api'

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
