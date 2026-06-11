// ================================
// 범용 유틸리티 함수
// ================================

/**
 * 클래스명을 조건부로 결합합니다.
 * Tailwind CSS와 함께 사용할 때 유용합니다.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * 숫자를 한국어 통화 형식으로 포맷합니다.
 * @example formatCurrency(10000) => "10,000원"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * 날짜를 한국어 형식으로 포맷합니다.
 * @example formatDate(new Date()) => "2026년 6월 11일"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * 날짜와 시간을 한국어 형식으로 포맷합니다.
 * @example formatDateTime(new Date()) => "2026년 6월 11일 오후 2:30"
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d)
}

/**
 * 주어진 시간(ms)만큼 대기합니다.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 값이 비어있는지 확인합니다.
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
