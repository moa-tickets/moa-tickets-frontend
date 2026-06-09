### 성능 최적화 규칙 및 워크플로우

moa-frontend 번들/로딩 최적화 작업에서 도출된 규칙. 신규 페이지·컴포넌트 작성 시 준수할 것.

---

#### 0. 가장 중요한 원칙 — dev 수치로 성능을 판단하지 말 것

`next dev`의 번들은 **비압축 + 소스맵 + HMR + devtools**를 포함해 프로덕션의 수십~수천 배 크기다.

| | main-app.js 크기 |
|---|---|
| `next dev` (webpack) | 7.3 MB |
| `next build` (prod) | 557 bytes |

- DevTools Network 탭의 "Content Downloading"이 길다면 **먼저 dev인지 prod인지 확인**한다.
- 성능 판단은 반드시 **`npm run build && npm run start`** 의 프로덕션 수치로 한다.
- 빌드 출력의 `Route (app)` 섹션 `First Load JS` 값이 실제 사용자 기준 지표다.

---

#### 1. dev 서버는 Turbopack 사용

`package.json`:
```json
"dev": "next dev --turbopack"
```

- `next.config.ts`의 `turbopack: {}` 키만으로는 활성화되지 않는다. **CLI 플래그(`--turbopack`)가 필요**하다.
- Turbopack은 라우트별 on-demand 번들링으로 단일 거대 `main-app.js` 블로킹을 제거하고 HMR을 가속한다.
- (선택) 재시작 캐싱: `experimental.turbopackFileSystemCacheForDev: true`

---

#### 2. 아이콘 — barrel import 금지, 브랜드 아이콘은 인라인 SVG

`react-icons/si`, `react-icons/ri` 등 서브패키지 barrel은 아이콘 1개만 써도 dev에서 인덱스 전체(수 MB)를 끌어온다. (`si` 6.46MB + `ri` 3.30MB 사례)

- **소셜/브랜드 아이콘(네이버·카카오 등)은 인라인 SVG 컴포넌트로 직접 작성**한다. → [src/shared/ui/SocialLoginSection.tsx](../src/shared/ui/SocialLoginSection.tsx) 참고
- 그 외 일반 아이콘에서 react-icons를 쓸 경우 반드시 `next.config.ts`에 tree-shaking 설정을 둔다:
  ```ts
  experimental: { optimizePackageImports: ['react-icons'] }
  ```
- 프로덕션은 `optimizePackageImports`로 tree-shaking되지만, **dev barrel 문제는 인라인 SVG로만 근본 해결**된다.

---

#### 3. Server Component 우선 — `'use client'` 최소화

`'use client'`는 자신과 **import하는 모든 하위 컴포넌트**를 클라이언트 번들에 포함시킨다.

- hooks(`useState`/`useEffect` 등)·이벤트 핸들러·브라우저 API가 **없으면 `'use client'`를 붙이지 않는다**.
- 정적 렌더링 컴포넌트(Footer, 배너, 카드, 그리드 등)는 Server Component로 둔다.
- 페이지 이동은 `useRouter().push()` 대신 `<Link>`를 쓴다. (불필요한 클라이언트 경계 제거)

---

#### 4. Provider는 필요한 라우트 그룹에만 배치

- 전역 Provider를 root `layout.tsx`에 두면 **모든 라우트(불필요한 페이지 포함)** 에 클라이언트 런타임이 실린다.
- Provider는 실제 필요한 라우트 그룹 layout에만 둔다. 예: 인증 페이지는 데이터 패칭 Provider 불필요.
- 미사용 의존성은 제거한다. (예: `useQuery`/`useMutation`을 한 군데도 안 쓰면 React Query 자체를 제거)
- Client Provider 패턴: `useState(() => createClient())`로 인스턴스를 1회만 생성한다. (렌더마다 재생성 금지)

---

#### 5. 라우트 그룹으로 공통 레이아웃 공유 — 중복 import 금지

- `Header`/`Footer` 등 공통 UI는 각 `page.tsx`에서 개별 import하지 말고 **라우트 그룹 `(group)/layout.tsx`에서 한 번만** 렌더한다.
- 같은 화면을 서로 다른 경로에 복제하지 않는다. (중복 라우트 = 동일 컴포넌트 그래프가 2개 청크로 빌드됨)
- 공통 레이아웃이 필요한 페이지는 해당 라우트 그룹 안에 배치한다.

---

#### 6. 코드 스플리팅(`next/dynamic`)은 선별 적용

- **적용 대상**: fold 아래 콘텐츠, 조건부/지연 노출되는 무거운 컴포넌트.
- **적용 금지**: 페이지의 메인 콘텐츠(어차피 즉시 필요) — 쪼개도 실익 없이 복잡도만 증가.

---

#### 7. 검증 절차 (변경 후 필수)

1. `npm run type-check` (또는 `tsc --noEmit`) 통과
2. `npm run build` 성공 + `Route (app)`의 `First Load JS` 회귀 없음 확인
3. 번들 상세 분석이 필요하면 `npm run analyze` (`@next/bundle-analyzer` 연동됨)
4. 실제 로딩 측정은 `npm run start`(프로덕션)로 수행
