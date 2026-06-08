'use client'

import { useMediaQuery, useLocalStorage } from '@/shared/hooks'

/**
 * 다크 모드 토글 버튼 예제
 * useMediaQuery와 useLocalStorage를 조합하여 hydration 오류 방지
 */
export function DarkModeToggle() {
  const { matches: prefersDark, isLoaded: prefersLoaded } = useMediaQuery(
    '(prefers-color-scheme: dark)'
  )
  const {
    value: theme,
    setValue: setTheme,
    isLoaded: themeLoaded,
  } = useLocalStorage('theme', prefersDark ? 'dark' : 'light')

  // 두 hook 모두 로드될 때까지 렌더링 안 함
  if (!prefersLoaded || !themeLoaded) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
