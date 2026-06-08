'use client'

import type { ReactNode } from 'react'
import { useHydrated } from '@/shared/hooks'

interface ClientOnlyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * 자식 컴포넌트를 클라이언트에서만 렌더링하는 래퍼
 * hydration 오류를 방지하면서 클라이언트 전용 UI 표시
 */
export function ClientOnlyWrapper({ children, fallback = null }: ClientOnlyWrapperProps) {
  const hydrated = useHydrated()

  if (!hydrated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
