import axios from 'axios'
import { instanceUrl, type GreenApiCredentials } from '../../../shared/api'
import type { ReceiveNotificationResponse } from '../model/types'

export async function receiveNotification(
  credentials: GreenApiCredentials,
): Promise<ReceiveNotificationResponse | null> {
  const { idInstance, apiTokenInstance } = credentials
  const { data } = await axios.get(instanceUrl(idInstance, apiTokenInstance, 'receiveNotification'))
  return data
}
