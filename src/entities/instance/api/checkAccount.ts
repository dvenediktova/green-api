import axios from 'axios'
import { instanceUrl, type GreenApiCredentials } from '../../../shared/api'

export interface CheckAccountResponse {
  exist: boolean
  chatId: string
}

export async function checkAccount(
  credentials: GreenApiCredentials,
  phoneNumber: string,
): Promise<CheckAccountResponse> {
  const { idInstance, apiTokenInstance } = credentials
  const { data } = await axios.post(instanceUrl(idInstance, apiTokenInstance, 'checkAccount'), {
    phoneNumber: Number(phoneNumber),
  })
  return data
}
