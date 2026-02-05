import TopHeader from '@/shared/components/header/TopHeader';
import BottomHeader from '@/shared/components/header/BottomHeader';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from '@/renderWithRedux';
import QueryProvider from '../provider/QueryProvider';

// 홈 관련 테스트

describe('Home Page about Components Rendering', () => {
  // 오리지널 인터섹션 옵저버 저장
  const originalIO = globalThis.IntersectionObserver;

  // 각 테스트 후 원래 Mock으로 복원
  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    localStorage.clear();
  });

  // useMember /api/members/me 모킹
  jest.mock('@/features/member/useMember', () => ({
    useMember: () => ({
      getMember: { mutate: jest.fn() },
      getMemberPending: false,
      logoutMember: { mutate: jest.fn() },
    }),
  }));

  // 1. TopHeader 컴포넌트에 로고가 랜더링 되는지 확인한다. (인터섹팅 전)
  it('should render logo in Top Header Component', () => {
    const { container } = render(
      <MemoryRouter>
        <TopHeader />
      </MemoryRouter>,
    );

    // 인터섹팅 전 스켈레톤 받기
    const skeletonLogoElement = container.querySelector('.skeleton__component');

    // 인터섹팅 전 스켈레톤 엘리먼트가 존재하는지 확인
    expect(skeletonLogoElement).toBeInTheDocument();
  });

  // 2. TopHeader 컴포넌트에 로고가 랜더링 되는지 확인한다. (인터섹팅 후)
  it('should render logo image after intersection', () => {
    // observe 호출 시 콜백을 즉시 실행하여 인터섹팅 상태로 전환
    globalThis.IntersectionObserver = jest.fn((callback) => ({
      observe: jest.fn(() => {
        callback([{ isIntersecting: true }]);
      }),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })) as unknown as typeof IntersectionObserver;

    render(
      <MemoryRouter>
        <TopHeader />
      </MemoryRouter>,
    );

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo.svg');
  });

  // 3. 검색 인풋 포커스 되었을 때, 검색 내역 박스가 제대로 랜더링 되는가
  it('if search input is focused, search history box should be rendered', () => {
    render(
      <MemoryRouter>
        <TopHeader />
      </MemoryRouter>,
    );

    const searchInput =
      screen.getByPlaceholderText('매일 해외여행 50% 선착순 쿠폰');
    fireEvent.focus(searchInput);

    expect(screen.getByText('실시간 검색어')).toBeInTheDocument();
  });

  // 4. 검색 박스 바깥 부분 클릭 시, 검색 내역 박스 언마운트
  it('if clicked outside of search box, search history box should be unmounted', () => {
    render(
      <MemoryRouter>
        <TopHeader />
      </MemoryRouter>,
    );

    const searchInput =
      screen.getByPlaceholderText('매일 해외여행 50% 선착순 쿠폰');
    fireEvent.focus(searchInput);
    expect(screen.getByText('실시간 검색어')).toBeInTheDocument();

    // 바깥 부분 클릭
    fireEvent.click(document.body);

    expect(screen.queryByText('실시간 검색어')).not.toBeInTheDocument();
  });

  // 5. 검색어 입력 시, change 이벤트가 제대로 작동하는지
  it('should handle change event when typing in search input', () => {
    render(
      <MemoryRouter>
        <TopHeader />
      </MemoryRouter>,
    );

    const searchInput =
      screen.getByPlaceholderText('매일 해외여행 50% 선착순 쿠폰');

    fireEvent.change(searchInput, { target: { value: '모아' } });

    expect(searchInput).toHaveValue('모아');
  });

  // 6. BottomHeader 컴포넌트 랜더링 시 메뉴들이 제대로 랜더링 되는가 (isLoggedIn: false)
  it('should render menu items in Bottom Header Component when not logged in', () => {
    // isLoggedIn 가져오기
    const { store } = renderWithRedux(
      <QueryProvider>
        <MemoryRouter>
          <BottomHeader />
        </MemoryRouter>
      </QueryProvider>,
    );

    const state = store.getState();

    const loginMenu = screen.getAllByRole('button', { name: '로그인' })[0];
    const myReservation = screen.getByRole('button', { name: '내 예약' });
    const customerCenter = screen.getAllByRole('button', {
      name: '1:1 문의',
    })[0];

    expect(state.loginReducer.isLoggedIn).toBe(false);
    expect(loginMenu).toBeInTheDocument();
    expect(myReservation).toBeInTheDocument();
    expect(customerCenter).toBeInTheDocument();
  });

  // 7. BottomHeader 컴포넌트 랜더링 시 메뉴들이 제대로 랜더링 되는가 (isLoggedIn: true)
  it('should render menu items in Bottom Header Component when logged in', () => {
    // isLoggedIn 상태를 true로 설정하여 렌더링
    const { store } = renderWithRedux(
      <QueryProvider>
        <MemoryRouter>
          <BottomHeader />
        </MemoryRouter>
      </QueryProvider>,
      { loginReducer: { isLoggedIn: true } },
    );

    const state = store.getState();

    const logoutMenu = screen.getAllByRole('button', { name: '로그아웃' })[0];
    const myReservation = screen.getByRole('button', { name: '내 예약' });
    const customerCenter = screen.getAllByRole('button', {
      name: '1:1 문의',
    })[0];

    expect(state.loginReducer.isLoggedIn).toBe(true);
    expect(logoutMenu).toBeInTheDocument();
    expect(myReservation).toBeInTheDocument();
    expect(customerCenter).toBeInTheDocument();
  });
});
