# moa-web-builder 구현 체크리스트

## ✅ 워크플로우 단계

### 1단계: 기술 스택 학습

- [x] Next.js 15.1.8 (App Router)
- [x] React 19.0.0
- [x] TypeScript 5.7.3
- [x] Tailwind CSS 4.0
- [x] Zustand (authStore)
- [x] React Query (QueryProvider)

### 2단계: UI/UX 구현

- [x] 참고 디자인 분석 (ONSTAGE 티켓 예매)
- [x] 디자인 시스템 정의
- [x] 모든 페이지 UI 구현

### 3단계: 로그인/회원가입 구현

- [x] 로그인 페이지 구현
- [x] 회원가입 페이지 구현
- [x] 로고명: MOA TICKET (변경 완료)
- [x] 완전 반응형 디자인

### 4단계: 컴포넌트 분리

- [x] LoginLeftComponent (다크 섹션)
- [x] LoginRightComponent (폼 섹션)
- [x] SignupLeftComponent (다크 섹션)
- [x] SignupRightComponent (폼 섹션)
- [x] Header 컴포넌트 (공통)
- [x] 최소 2~3개 컴포넌트 레벨 분리

### 5단계: 디자인 시스템 적용

- [x] 컬러 팔레트
  - [x] Primary (Accent): #ed4543
  - [x] Dark Background: #311917
  - [x] Neutral grays (gray-50 ~ gray-900)
- [x] Spacing (4px, 8px, 12px, 16px, 20px, 24px, 32px)
- [x] Elevation (shadow-sm, shadow-md, shadow-lg, shadow-xl)
- [x] Scale/Typography (text-xs ~ text-4xl)

## ✅ 페이지 구현

### 메인 페이지 `/`

- [x] 히어로 섹션 (그래디언트 배경)
- [x] 통계 섹션 (누적 예매, 공연, 평점)
- [x] 공연 카드 그리드
- [x] CTA 섹션
- [x] 완전 반응형

### 로그인 `/login`

- [x] 좌측: 다크 섹션 (로고, 텍스트, 통계)
- [x] 우측: 화이트 섹션 (폼)
- [x] 컴포넌트 분리 (2개)
- [x] h-screen 고정 (100vh)
- [x] 모바일: 좌측 숨김 (`hidden lg:flex`)

### 회원가입 `/signup`

- [x] 좌측: 다크 섹션 (로고, 텍스트)
- [x] 우측: 화이트 섹션 (폼)
- [x] 컴포넌트 분리 (2개)
- [x] h-screen 고정 (100vh)
- [x] 모바일: 좌측 숨김 (`hidden lg:flex`)
- [x] 이메일, 비밀번호, 이름, 휴대폰 입력
- [x] 약관 동의 체크박스

### 공연 목록 `/concerts`

- [x] 페이지 헤더
- [x] 검색 입력
- [x] 장르/가격대 필터 (모바일: 2열)
- [x] 공연 카드 그리드 (반응형: 1/2/3열)
- [x] 장르 배지
- [x] 가격 표시

### 공연 상세 `/concerts/[id]`

- [x] 공연 이미지
- [x] 기본 정보 (제목, 아티스트, 장르)
- [x] 이벤트 세부사항 (날짜, 시간, 장소, 좌석)
- [x] 설명 섹션
- [x] 우측 Sticky 예매 사이드바
- [x] 티켓 타입 선택 (일반/VIP)
- [x] 수량 선택

### 예매 내역 `/bookings`

- [x] 예매 목록
- [x] 상태 배지 (확정/완료/취소)
- [x] 공연 정보 표시
- [x] 합계 금액
- [x] 반응형 레이아웃

### 마이페이지 `/profile`

- [x] 좌측 사이드바 (프로필, 메뉴)
- [x] 프로필 정보 폼
- [x] 비밀번호 변경 폼
- [x] 완전 반응형

### 관리자 대시보드 `/admin`

- [x] 통계 카드 (공연, 예매, 매출, 회원)
- [x] 관리 메뉴 (공연, 매출, 회원, 설정)
- [x] 최근 활동 섹션

## ✅ 반응형 설계

### 모바일 (320px+)

- [x] px-4 패딩
- [x] 스택 레이아웃
- [x] 폰트 크기: text-base/text-lg

### 태블릿 (640px+ sm:)

- [x] sm:px-6 패딩
- [x] 2열 그리드 (필터)
- [x] 2/3열 그리드 (카드)

### 데스크톱 (1024px+ lg:)

- [x] lg: 프리픽스 클래스
- [x] 3열 그리드 (카드)
- [x] 좌측 섹션 표시 (Login/Signup)
- [x] 풀 헤더 표시

## ✅ 기술 요구사항

### 상태 관리

- [x] Zustand authStore 구현
- [x] React Query QueryProvider 통합

### 코드 품질

- [x] TypeScript 타입 검사 ✅
- [x] ESLint 린트 ✅
- [x] Prettier 포맷 ✅
- [x] FSD 아키텍처

### 개발 도구

- [x] npm 스크립트 (dev, build, lint, format)
- [x] Python 스크립트 (7개)
- [x] build-check, build-full, dev-server 등

## 📊 최종 상태

| 항목          | 상태   | 비고                             |
| ------------- | ------ | -------------------------------- |
| 페이지        | 8/8 ✅ | 모두 구현 완료                   |
| 반응형        | ✅     | 모바일/태블릿/데스크톱 모두 지원 |
| 컴포넌트      | ✅     | 최소 2~3레벨 분리                |
| 디자인 시스템 | ✅     | 색상/스페이싱/타이포그래피 적용  |
| 빌드 검증     | ✅     | Type/Lint/Format 모두 통과       |
| Dev Server    | ✅     | http://localhost:3000 실행 중    |

## 🎯 다음 단계

1. **기능 구현** (현재 Mock 데이터 사용)
   - [ ] 로그인/회원가입 API 연동
   - [ ] 공연 목록 API 연동
   - [ ] 예매 기능 구현

2. **추가 기능**
   - [ ] 다크 모드 (DarkModeToggle 활용)
   - [ ] 찜하기 기능
   - [ ] 검색 기능

3. **성능 최적화**
   - [ ] Image 컴포넌트로 최적화
   - [ ] Code Splitting
   - [ ] SEO 최적화

4. **테스트**
   - [ ] Unit 테스트
   - [ ] Integration 테스트
   - [ ] E2E 테스트
