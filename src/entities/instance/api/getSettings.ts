import axios from 'axios'
import { instanceUrl } from '../../../shared/api/client'
import type { GreenApiCredentials } from '../../../shared/api/types'

export interface GetSettingsResponse {
  wid?: string
  [key: string]: unknown
}

export async function getSettings(credentials: GreenApiCredentials): Promise<GetSettingsResponse> {
  const { idInstance, apiTokenInstance } = credentials
  const { data } = await axios.get(instanceUrl(idInstance, apiTokenInstance, 'getSettings'))
  return data
}
