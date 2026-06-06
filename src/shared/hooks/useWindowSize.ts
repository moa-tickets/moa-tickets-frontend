'use client'

import { useEffect, useState } from 'react'

interface WindowSize {
  width: number | undefined
  height: number | undefined
}

/**
 * 윈도우 크기를 추적하는 hook
 * SSR 환경에서 초기 렌더링 시 window 접근 오류 방지
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // 초기 크기 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // 리사이즈 핸들러
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
