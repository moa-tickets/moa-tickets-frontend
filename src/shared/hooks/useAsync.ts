'use client'

import { useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * 비동기 작업을 안전하게 처리하는 hook
 * 마운트 후에 데이터 페칭 시작하여 hydration 오류 방지
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate: boolean = true) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  useEffect(() => {
    if (!immediate) return

    let isMounted = true

    ;(async () => {
      try {
        const response = await asyncFunction()
        if (isMounted) {
          setState({
            data: response,
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [asyncFunction, immediate])

  return state
}
