// ================================
// 공통 API 응답 타입
// ================================

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  code?: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  size: number
  hasNext: boolean
  hasPrevious: boolean
}

// ================================
// 공통 UI 타입
// ================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'

// ================================
// 공통 유틸리티 타입
// ================================

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

/** 객체의 특정 키를 필수로 만드는 유틸리티 타입 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

/** 객체의 특정 키를 선택적으로 만드는 유틸리티 타입 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
