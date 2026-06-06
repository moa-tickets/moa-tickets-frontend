'use client'

import { useEffect, useRef } from 'react'

/**
 * 컴포넌트 마운트 완료 여부를 추적하는 hook
 * 클라이언트에서만 렌더링되는 콘텐츠에 활용
 */
export function useIsMounted() {
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef.current
}
