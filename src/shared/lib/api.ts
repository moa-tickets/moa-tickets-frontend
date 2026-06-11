import type { ApiResponse } from '@/shared/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api'

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

/**
 * URL에 쿼리 파라미터를 추가합니다.
 */
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(`${BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }
  return url.toString()
}

/**
 * 기본 fetch 래퍼. 공통 헤더, 에러 처리를 포함합니다.
 */
async function fetchApi<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options

  const response = await fetch(buildUrl(endpoint, params), {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: '알 수 없는 오류가 발생했습니다.' }))
    throw new Error(error.message ?? `HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    fetchApi<ApiResponse<T>>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    fetchApi<ApiResponse<T>>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    fetchApi<ApiResponse<T>>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    fetchApi<ApiResponse<T>>(endpoint, { ...options, method: 'DELETE' }),
}
