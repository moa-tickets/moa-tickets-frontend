import '@testing-library/jest-dom';
import TopHeader from '@/shared/components/header/TopHeader';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// 홈 관련 테스트

describe('Home Page about Components Rendering', () => {
  // 오리지널 인터섹션 옵저버 저장
  const originalIO = globalThis.IntersectionObserver;

  // 각 테스트 후 원래 Mock으로 복원
  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
  });

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
});
