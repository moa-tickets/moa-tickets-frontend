# Next.js Hydration 오류 방지 가이드

Hydration 오류는 SSR(서버 사이드 렌더링)된 HTML과 클라이언트에서 렌더링된 DOM이 일치하지 않을 때 발생합니다.
이 가이드는 이 프로젝트의 커스텀 hooks를 활용하여 hydration 오류를 방지하는 방법을 설명합니다.

## 🎯 핵심 원칙

1. **초기 렌더링은 서버와 클라이언트가 동일해야 함**
2. **클라이언트만의 상태는 useEffect 후 업데이트**
3. **시간이나 타이밍에 의존하는 렌더링 피하기**
4. **suppressHydrationWarning 사용 최소화**

---

## 📚 Hook 사용법

### 1. `useIsClient()` / `useHydrated()`
클라이언트 환경인지 확인하는 가장 기본적인 hook입니다.

```tsx
'use client'

import { useHydrated } from '@/shared/lib/hooks'

export function ClientOnlyComponent() {
  const hydrated = useHydrated()

  // hydrated가 true일 때만 렌더링
  if (!hydrated) {
    return null // 또는 로딩 UI
  }

  return <div>클라이언트에서만 렌더링됨</div>
}
```

**언제 사용?**
- 클라이언트 전용 기능이 필요할 때
- 서버에서 렌더링하면 안 되는 콘텐츠

---

### 2. `useIsMounted()`
ref를 사용한 경량 마운트 상태 추적입니다.

```tsx
'use client'

import { useIsMounted } from '@/shared/lib/hooks'

export function ConditionalRender() {
  const isMounted = useIsMounted()

  return (
    <>
      {isMounted && <ClientOnlyFeature />}
    </>
  )
}
```

**언제 사용?**
- useHydrated()보다 가벼운 구현이 필요할 때
- useEffect 실행 후 조건부 렌더링

---

### 3. `useLocalStorage()`
localStorage와 안전하게 상호작용합니다.

```tsx
'use client'

import { useLocalStorage } from '@/shared/lib/hooks'

export function ThemeToggle() {
  const { value: theme, setValue: setTheme, isLoaded } = useLocalStorage('theme', 'light')

  if (!isLoaded) {
    return null // 로드될 때까지 대기
  }

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

**주의사항:**
- isLoaded가 true일 때까지 렌더링하지 않기
- localStorage 초기 로드는 useEffect 내에서 진행

---

### 4. `useWindowSize()`
윈도우 크기를 안전하게 추적합니다.

```tsx
'use client'

import { useWindowSize } from '@/shared/lib/hooks'

export function ResponsiveComponent() {
  const { width, height } = useWindowSize()

  // 초기 렌더링(SSR) 시 undefined 반환
  // 클라이언트에서 useEffect 후 실제 값으로 업데이트
  if (width === undefined) {
    return <div>로딩 중...</div>
  }

  return (
    <div>
      {width < 768 ? '모바일 레이아웃' : '데스크톱 레이아웃'}
    </div>
  )
}
```

**장점:**
- SSR 시 undefined 반환하므로 서버/클라이언트 일치
- 리사이즈 이벤트 자동 처리

---

### 5. `useMediaQuery()`
CSS 미디어 쿼리를 JavaScript에서 추적합니다.

```tsx
'use client'

import { useMediaQuery } from '@/shared/lib/hooks'

export function ResponsiveImage() {
  const { matches: isDark, isLoaded } = useMediaQuery('(prefers-color-scheme: dark)')

  if (!isLoaded) {
    return null // 로드될 때까지 대기
  }

  return (
    <img
      src={isDark ? '/image-dark.png' : '/image-light.png'}
      alt="Responsive"
    />
  )
}
```

**언제 사용?**
- 미디어 쿼리 조건에 따른 동적 렌더링
- 사용자 시스템 설정(다크 모드 등)에 따른 UI 변경

---

### 6. `useAsync()`
비동기 데이터 페칭을 안전하게 처리합니다.

```tsx
'use client'

import { useAsync } from '@/shared/lib/hooks'

export function DataComponent() {
  const { data, loading, error } = useAsync(async () => {
    const res = await fetch('/api/data')
    return res.json()
  })

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error.message}</div>

  return <div>{data?.name}</div>
}
```

**특징:**
- 마운트 후에만 실행 (SSR 스킵)
- 언마운트된 컴포넌트 상태 업데이트 방지
- 자동 에러 처리

---

### 7. `useDebounce()`
값의 업데이트를 지연시킵니다.

```tsx
'use client'

import { useDebounce } from '@/shared/lib/hooks'

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, 500)

  // debouncedTerm이 변경되면 API 호출
  useEffect(() => {
    if (debouncedTerm) {
      fetchResults(debouncedTerm)
    }
  }, [debouncedTerm])

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="검색..."
    />
  )
}
```

---

## ❌ 피해야 할 패턴

### 1. Date/Time에 의존하는 렌더링
```tsx
// ❌ 나쁜 예: 서버와 클라이언트에서 다른 시간 출력
export function Clock() {
  return <div>{new Date().toLocaleTimeString()}</div>
}

// ✅ 좋은 예: useEffect 후 렌더링
export function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
  }, [])

  return <div>{time || '-'}</div>
}
```

### 2. Math.random() 사용
```tsx
// ❌ 나쁜 예
export function RandomComponent() {
  const randomId = Math.random()
  return <div key={randomId}>...</div>
}

// ✅ 좋은 예: useId 또는 useEffect 활용
import { useId } from 'react'
export function RandomComponent() {
  const id = useId()
  return <div key={id}>...</div>
}
```

### 3. 조건부 렌더링이 서버/클라이언트에서 다를 때
```tsx
// ❌ 나쁜 예: 클라이언트에서만 조건 판단
export function Component() {
  const isMobile = window.innerWidth < 768 // SSR 시 에러!
  return isMobile ? <Mobile /> : <Desktop />
}

// ✅ 좋은 예: useMediaQuery 사용
export function Component() {
  const { matches: isMobile, isLoaded } = useMediaQuery('(max-width: 768px)')
  if (!isLoaded) return null
  return isMobile ? <Mobile /> : <Desktop />
}
```

---

## 🔍 디버깅 팁

### 1. 브라우저 콘솔 확인
Next.js는 hydration 불일치 시 자세한 경고를 표시합니다.

### 2. React DevTools
마운트 시점과 상태 업데이트 순서를 추적합니다.

### 3. 단계적 테스트
- 빌드 후 프로덕션 모드에서 테스트
- `next build && next start` 실행

---

## 📋 체크리스트

hydration 오류 없이 컴포넌트를 작성하려면:

- [ ] 서버/클라이언트 초기 렌더링이 동일한가?
- [ ] Date, Math.random() 등 비결정적 함수를 사용했는가?
- [ ] localStorage, window 등 클라이언트만의 API를 직접 사용했는가?
- [ ] useEffect 없이 조건부 렌더링을 했는가?
- [ ] 마운트 전후로 다른 DOM이 렌더링되는가?

이 중 하나라도 "예"라면, 해당 hooks를 활용하여 수정하세요.
