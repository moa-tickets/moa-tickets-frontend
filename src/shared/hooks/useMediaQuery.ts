'use client'

import { useEffect, useState } from 'react'

/**
 * 미디어 쿼리 매칭을 추적하는 hook
 * SSR과 클라이언트 렌더링 간 미디어 쿼리 결과 불일치 방지
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 초기 상태 설정
    const mediaQueryList = window.matchMedia(query)
    setMatches(mediaQueryList.matches)
    setIsLoaded(true)

    // 리스너 추가
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return { matches, isLoaded }
}
