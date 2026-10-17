const BASE_URL = 'https://api.green-api.com'

export function instanceUrl(idInstance: string, apiTokenInstance: string, method: string): string {
  return `${BASE_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`
}
