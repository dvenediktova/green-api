import axios from 'axios'
import { instanceUrl, type GreenApiCredentials } from '../../../shared/api'

export async function deleteNotification(
  credentials: GreenApiCredentials,
  receiptId: number,
): Promise<void> {
  const { idInstance, apiTokenInstance } = credentials
  await axios.delete(`${instanceUrl(idInstance, apiTokenInstance, 'deleteNotification')}/${receiptId}`)
}
