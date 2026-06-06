'use client'

import { useEffect, useState } from 'react'

/**
 * 클라이언트 렌더링 여부를 판별하는 hook
 * Hydration 오류를 방지하기 위해 마운트 후 상태 업데이트
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
