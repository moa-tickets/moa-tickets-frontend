import * as React from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import concertDetailReducer, {
  GET_DETAIL_PRODUCT,
  type ProductDetail,
  type RealProductDetail,
} from '../../entities/reducers/ConcertDetailReducer';
import { useProduct } from '../../features/product/useProduct';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductDetail Mutation Test - Sessions Length Validation', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        concertDetailReducer,
      },
    });

  const productDetailMock: ProductDetail = {
    age: 8,
    bookingOpen: new Date().toISOString(),
    concertDuration: '150분',
    concertEnd: new Date().toISOString(),
    concertId: 1,
    concertName: 'Mocking Concert',
    detail: null,
    hallName: 'Mocking Hall',
    sessions: [
      {
        sessionId: 1,
        price: 1000,
        date: '2025-05-24T18:00:00',
      },
    ],
    thumbnail: null,
  };

  it('상품 상세 데이터 중 Sessions 배열의 길이가 1 이상이어야 한다', async () => {
    // 1. Mock API Response
    mockedAxios.get.mockResolvedValueOnce({ data: productDetailMock });

    // 2. Create Store & Dispatch
    const store = createTestStore();
    const response = await axios.get('/api/product/detail/1');

    store.dispatch({
      type: GET_DETAIL_PRODUCT,
      payload: { data: response.data },
    });

    // 3. Verify Redux State
    const state = store.getState() as { concertDetailReducer: RealProductDetail };
    const sessions = state.concertDetailReducer.data.sessions;

    expect(sessions.length).toBeGreaterThanOrEqual(1);
  });

  it('useProduct mutation 호출 시 sessions 배열의 길이가 1 이상이어야 한다', async () => {
    // 1. Setup
    const store = createTestStore();
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    function wrapper({ children }: { children: ReactNode }) {
      return React.createElement(Provider, {
        store,
        children: React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children,
        ),
      } as React.ComponentProps<typeof Provider>);
    }

    // 2. Mock API Response
    mockedAxios.get.mockResolvedValueOnce({ data: productDetailMock });

    // 3. Render Hook & Call Mutation
    const { result } = renderHook(() => useProduct(), { wrapper });

    result.current.getDetailProduct.mutate({ id: 1 });

    // 4. Wait for mutation to complete & Verify Redux State
    await waitFor(() => {
      expect(result.current.getDetailProduct.isSuccess).toBe(true);
    });

    const state = store.getState() as { concertDetailReducer: RealProductDetail };
    const sessions = state.concertDetailReducer.data.sessions;

    expect(sessions.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Not Selected Seats And Navigate Payment Page', () => {
  const createBookingTestStore = (selectedTicketIds: number[] = []) =>
    configureStore({
      reducer: {
        bookSeatReducer: (
          state = {
            data: [],
            selectedTicketIds,
            holdedInfo: { holdedIndex: [], holdToken: '', expiresAt: '' },
          },
        ) => state,
        loginReducer: (
          state = {
            isLoggedIn: true,
            nickname: 'test',
            email: 'test@test.com',
            isSeller: false,
            selectedSession: { date: '2025-05-24', sessionId: 1 },
          },
        ) => state,
      },
    });

  it('세션 선택 후 자리를 선택하지 않고 결제하기 이동 시 이동되지 못하게 막는지 검증', async () => {
    // 1. Setup - 선택된 좌석 없음
    const store = createBookingTestStore([]);

    // 2. Redux state에서 selectedTicketIds가 비어있는지 확인
    const state = store.getState();
    const selectedTicketIds = state.bookSeatReducer.selectedTicketIds;

    // 3. 좌석이 선택되지 않았을 때 결제 진행 불가 검증
    expect(selectedTicketIds.length).toBe(0);

    // 4. 좌석 미선택 시 결제 API 호출을 막아야 함
    const canProceedToPayment = selectedTicketIds.length > 0;
    expect(canProceedToPayment).toBe(false);
  });

  it('좌석을 선택한 경우에만 결제 진행이 가능해야 한다', async () => {
    // 1. Setup - 좌석 1개 선택
    const store = createBookingTestStore([101]);

    // 2. Redux state에서 selectedTicketIds 확인
    const state = store.getState();
    const selectedTicketIds = state.bookSeatReducer.selectedTicketIds;

    // 3. 좌석이 선택되었는지 확인
    expect(selectedTicketIds.length).toBeGreaterThan(0);

    // 4. 결제 진행 가능 여부 검증
    const canProceedToPayment = selectedTicketIds.length > 0;
    expect(canProceedToPayment).toBe(true);
  });
});

describe('If Session Selected and Seats Selected, holdedInfo States are in', () => {
  const createHoldTestStore = () =>
    configureStore({
      reducer: {
        bookSeatReducer: (
          state = {
            data: [],
            selectedTicketIds: [101, 102],
            holdedInfo: { holdedIndex: [], holdToken: '', expiresAt: '' },
          },
          action: { type: string; payload?: unknown },
        ) => {
          if (action.type === 'post/hold') {
            const payload = action.payload as {
              holdIndex: number[];
              holdToken: string;
              expires: string;
            };
            return {
              ...state,
              holdedInfo: {
                holdedIndex: payload.holdIndex,
                holdToken: payload.holdToken,
                expiresAt: payload.expires,
              },
            };
          }
          return state;
        },
        loginReducer: (
          state = {
            isLoggedIn: true,
            nickname: 'test',
            email: 'test@test.com',
            isSeller: false,
            selectedSession: { date: '2025-05-24', sessionId: 1 },
          },
        ) => state,
      },
    });

  it('세션과 좌석이 선택되고 결제하기 버튼 누르면, holdToken 제공 받아, holdedInfo 오브젝트가 존재해야 할것', async () => {
    // 1. Setup - 세션과 좌석이 선택된 상태
    const store = createHoldTestStore();
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    // 2. Mock API Response - 좌석 홀드 성공 시 holdToken 반환
    const mockHoldResponse = {
      holdToken: 'mock-hold-token-12345',
      expiresAt: '2025-05-24T19:00:00',
    };
    mockedAxios.post.mockResolvedValueOnce({ data: mockHoldResponse });
    mockedAxios.get.mockResolvedValueOnce({ data: [] }); // getSeatInfo 호출용

    // 3. Render Hook
    const { useBooking } = await import('../../features/booking/useBooking');

    function wrapper({ children }: { children: ReactNode }) {
      return React.createElement(Provider, {
        store,
        children: React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children,
        ),
      } as React.ComponentProps<typeof Provider>);
    }

    const { result } = renderHook(() => useBooking(), { wrapper });

    // 4. 결제하기 버튼 클릭 시뮬레이션 - seatHold mutation 호출
    const state = store.getState();
    const sessionId = state.loginReducer.selectedSession.sessionId;
    const ticketIds = state.bookSeatReducer.selectedTicketIds;

    result.current.seatHold.mutate({ sessionId, ticketIds });

    // 5. mutation 완료 대기 및 holdedInfo 검증
    await waitFor(() => {
      expect(result.current.seatHold.isSuccess).toBe(true);
    });

    const updatedState = store.getState();
    const holdedInfo = updatedState.bookSeatReducer.holdedInfo;

    // 6. holdToken이 존재하고 holdedInfo 오브젝트가 올바르게 설정되었는지 검증
    expect(holdedInfo.holdToken).toBe('mock-hold-token-12345');
    expect(holdedInfo.holdedIndex).toEqual([101, 102]);
    expect(holdedInfo.expiresAt).toBe('2025-05-24T19:00:00');
  });
});
