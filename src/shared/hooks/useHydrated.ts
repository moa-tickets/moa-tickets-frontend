'use client'

import { useEffect, useState } from 'react'

/**
 * 하이드레이션 완료 여부를 추적하는 hook
 * SSR과 클라이언트 간 불일치 방지
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}
