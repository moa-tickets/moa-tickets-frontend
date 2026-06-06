'use client'

import { useEffect, useState } from 'react'

/**
 * 값을 디바운스하는 hook
 * 클라이언트 상태 업데이트가 필요한 경우 사용하여 hydration 일관성 유지
 */
export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
