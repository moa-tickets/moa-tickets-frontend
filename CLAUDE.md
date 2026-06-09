# CLAUDE.md

moa-tickets 웹 프론트엔드 작업 가이드. 화면 퍼블리싱을 다음 워크플로우로 진행한다.

## 프로젝트 개요

티켓 예매 웹 서비스. 기준 디자인은 https://nol.interpark.com/ticket 을 참고해 비슷하게 퍼블리싱한다.

**기술 스택**
- Next.js 15.5 (App Router) · React 19 · TypeScript 5.7
- Tailwind CSS 4
- 상태관리: zustand 5 (전역) / `useState`·`useReducer` (로컬)

## 디렉터리 구조 (FSD)

```
src/
├─ app/                    # Next.js App Router (라우팅 전용)
│  ├─ layout.tsx           # 루트 레이아웃 (전역 Provider는 최소화)
│  ├─ (main)/              # 헤더 공유 라우트 그룹
│  │  ├─ layout.tsx        # Header + 데이터 Provider
│  │  ├─ page.tsx          # 홈
│  │  └─ concerts·bookings·profile·admin/
│  └─ auth/                # 인증 라우트 그룹 (Provider 불필요)
│     ├─ login·signup/
├─ widgets/                # 페이지 단위 조합 컴포넌트 (auth, login, signup …)
└─ shared/                 # 공용 자원
   ├─ ui/                  # 재사용 UI 컴포넌트
   ├─ hooks/ · stores/ · providers/ · lib/
```

## 코딩 규칙 및 워크플로우

1. 코드 수정 후 **반드시 타입 체크**(`npm run type-check`) 후 유저에게 확인을 받는다.
2. 구현 후 **린트 통과**(`npm run lint`)를 확인한다.
3. 테스트는 전체가 아니라 **관련 파일만** 실행한다 (성능 고려).
4. **테스트 코드는 퍼블리싱 코드를 먼저 작성하고 유저 확인을 받은 후** 작성한다.
5. 디자인 세부 사항은 아래 페이지별 규칙을 따른다.

## 공통 규칙

- **성능 최적화** (번들/로딩, Server Component, 아이콘, dev 측정 기준 등): @rules/PERFORMANCE_RULES.md

## 페이지별 규칙

1. 로그인 페이지: @rules/LOGIN_DESIGN_RULES.md
2. 회원가입 페이지: @rules/SIGNUP_DESIGN_RULES.md
