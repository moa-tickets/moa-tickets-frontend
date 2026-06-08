# Feature-Sliced Design (FSD) + Next.js App Router 구조

moa-frontend는 Feature-Sliced Design 아키텍처를 Next.js App Router와 통합합니다.

## 디렉토리 구조

```
src/
├── app/                          # Next.js App Router (라우팅 & 레이아웃)
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # / (홈)
│   ├── globals.css              # 글로벌 스타일
│   ├── not-found.tsx            # 404 페이지
│   │
│   ├── tickets/                 # /tickets 라우트
│   │   ├── page.tsx
│   │   └── layout.tsx (optional)
│   │
│   └── tickets/[id]/            # /tickets/[id] 라우트
│       ├── page.tsx
│       └── layout.tsx (optional)
│
├── shared/                       # 공유 레이어 (전체 앱에서 사용)
│   ├── ui/                      # 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   │
│   ├── hooks/                   # 커스텀 React 훅
│   │   ├── useDebounce.ts
│   │   ├── usePagination.ts
│   │   └── index.ts
│   │
│   ├── lib/                     # 유틸리티 함수
│   │   ├── utils.ts            # cn(), formatDate() 등
│   │   ├── api.ts              # HTTP 클라이언트 설정
│   │   └── index.ts
│   │
│   ├── types/                   # 공유 타입 정의
│   │   ├── api.ts              # API 응답/요청 타입
│   │   ├── common.ts           # 공통 타입
│   │   └── index.ts
│   │
│   └── styles/                  # 공유 스타일 (CSS 변수, 테마 등)
│       └── variables.css
│
├── entities/                     # 비즈니스 엔티티 (도메인 모델)
│   ├── ticket/                  # 티켓 엔티티
│   │   ├── model/
│   │   │   ├── types.ts         # Ticket 타입
│   │   │   ├── store.ts         # 상태 관리 (필요시)
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   ├── TicketCard.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── user/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   ├── UserProfile.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── category/
│       ├── model/
│       ├── ui/
│       └── index.ts
│
└── features/                     # 사용자 기능 (상호작용)
    ├── ticket-search/           # 티켓 검색 기능
    │   ├── ui/
    │   │   ├── SearchForm.tsx
    │   │   ├── SearchResults.tsx
    │   │   └── index.ts
    │   ├── model/
    │   │   ├── types.ts
    │   │   └── store.ts (필요시)
    │   ├── api/
    │   │   ├── useSearchTickets.ts  # API 훅
    │   │   └── index.ts
    │   └── index.ts
    │
    ├── ticket-filter/
    │   ├── ui/
    │   │   ├── FilterPanel.tsx
    │   │   └── index.ts
    │   ├── model/
    │   │   └── types.ts
    │   └── index.ts
    │
    ├── auth/                    # 인증 기능
    │   ├── ui/
    │   │   ├── LoginForm.tsx
    │   │   └── index.ts
    │   ├── model/
    │   │   └── types.ts
    │   ├── api/
    │   │   └── useAuth.ts
    │   └── index.ts
    │
    └── pagination/
        ├── ui/
        │   ├── Pagination.tsx
        │   └── index.ts
        └── index.ts
```

## 레이어별 책임

### 🎨 shared (공유 레이어)

- 비즈니스 로직이 없는 재사용 가능한 컴포넌트와 유틸리티
- 프로젝트 어느 곳에서나 import 가능
- 예: 버튼, 입력 필드, 유틸 함수

### 📦 entities (엔티티 레이어)

- 비즈니스 도메인의 핵심 객체 (Ticket, User, Category 등)
- 타입 정의, UI 컴포넌트, 상태 관리 포함
- 다른 엔티티와 의존성 최소화
- 예: TicketCard (ticket 엔티티의 UI 표현)

### ⚡ features (기능 레이어)

- 사용자 상호작용과 비즈니스 로직
- 여러 엔티티를 조합하여 기능 구현
- API 호출, 상태 관리, 폼 처리 등
- 예: 검색 기능 (ticket 검색 + filter 조합)

### 📄 app (App Router 라우팅)

- Next.js App Router의 라우팅 및 레이아웃
- `page.tsx`: 각 라우트의 진입점
- `layout.tsx`: 라우트별 레이아웃 (optional)
- features와 entities를 조합하여 완전한 페이지 구성
- 최소한의 로직만 포함 (데이터 페칭, 리다이렉션 등)
- 예: `/tickets/[id]/page.tsx` (ticket detail 페이지)

## 임포트 규칙

✅ **허용하는 임포트:**

```typescript
// pages에서는 features, entities, shared 모두 임포트 가능
import { TicketCard } from '@/entities/ticket/ui'
import { SearchForm } from '@/features/ticket-search/ui'
import { cn } from '@/shared/lib'

// features에서는 entities, shared 임포트 가능
import { Ticket } from '@/entities/ticket/model'
import { Button } from '@/shared/ui'

// entities에서는 shared만 임포트 가능
import { cn } from '@/shared/lib'

// shared는 다른 레이어 임포트 불가
```

❌ **금지하는 임포트:**

```typescript
// ❌ entities에서 features 임포트 불가
import { SearchForm } from '@/features/ticket-search'

// ❌ pages에서 하위 페이지 임포트 불가 (next/link 사용)
import OtherPage from '@/pages/other'
```

## 각 레이어의 구조

### shared/

```
shared/
├── ui/               # 순수 UI 컴포넌트
├── hooks/            # 순수 리액트 훅
├── lib/              # 유틸리티 함수
├── types/            # 공유 타입
└── styles/           # 글로벌 스타일
```

### entities/[entityName]/

```
entities/[name]/
├── model/            # 비즈니스 로직, 타입, 상태
├── ui/               # 엔티티의 UI 표현
└── index.ts          # 공개 API
```

### features/[featureName]/

```
features/[name]/
├── ui/               # 기능의 UI 컴포넌트
├── model/            # 기능 관련 타입
├── api/              # API 호출 훅
└── index.ts          # 공개 API
```

### app/[route]/

```
app/[route]/
├── page.tsx          # Next.js 라우트 (필수)
├── layout.tsx        # 라우트 레이아웃 (optional)
└── error.tsx         # 에러 처리 (optional)
└── loading.tsx       # Suspense fallback (optional)
```

## 주요 포인트

1. **단일 책임 원칙**: 각 파일과 폴더는 한 가지 책임만 가짐
2. **명시적 의존성**: 계층 간 의존성이 명확하고 제한적
3. **모듈 응집도**: 관련된 코드는 함께 위치
4. **공개 API**: 각 레이어의 `index.ts`를 통해 공개 인터페이스 정의
5. **재사용성**: shared는 최대한 간단하고 재사용 가능하게 유지

## 라우팅 예시

### 기본 라우트 구조

```typescript
// src/app/page.tsx - / (홈)
export default function HomePage() {
  return <h1>Home</h1>
}

// src/app/tickets/page.tsx - /tickets (목록)
export default function TicketsPage() {
  return <h1>Tickets</h1>
}

// src/app/tickets/[id]/page.tsx - /tickets/123 (상세)
export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <h1>Ticket #{id}</h1>
}
```

### 기능과 라우트 연결

```typescript
// src/app/tickets/page.tsx - features 조합
import { SearchForm } from '@/features/ticket-search/ui'
import { FilterPanel } from '@/features/ticket-filter/ui'
import { TicketCard } from '@/entities/ticket/ui'

export default function TicketsPage() {
  return (
    <main>
      <SearchForm />
      <FilterPanel />
      {/* API 호출 후 여기에 TicketCard 렌더링 */}
    </main>
  )
}

// src/app/tickets/[id]/page.tsx - 상세 페이지
import { TicketDetail } from '@/features/ticket-detail/ui'

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main>
      <TicketDetail id={id} />
    </main>
  )
}
```

## 임포트 규칙 (Updated)

✅ **허용하는 임포트:**

```typescript
// app/page.tsx에서
import { TicketCard } from '@/entities/ticket/ui'
import { SearchForm } from '@/features/ticket-search/ui'
import { cn } from '@/shared/lib'

// features에서
import { Ticket } from '@/entities/ticket/model'
import { Button } from '@/shared/ui'

// entities에서
import { cn } from '@/shared/lib'
```

❌ **금지하는 임포트:**

```typescript
// ❌ app/page.tsx에서 다른 page.tsx 직접 임포트 (next/link 사용)
import OtherPage from '@/app/other/page'

// ❌ entities에서 features 임포트
import { SearchForm } from '@/features/ticket-search'
```
