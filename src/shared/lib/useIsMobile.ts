import { useEffect, useState } from 'react'

// Keep in sync with the `@media (max-width: ...)` breakpoint in Conversation.module.css and ChatPage.module.css
export const MOBILE_BREAKPOINT = 768
const MOBILE_BREAKPOINT_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT_QUERY)
    const handleChange = () => setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}
