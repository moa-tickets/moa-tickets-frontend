// 콘서트 상세 데이터 모킹
const productDetailResponses = jest.fn().mockReturnValue({
  data: {
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
        date: '2025-05-05 18:00:00',
        price: 100000,
        sessionId: 1,
      },
    ],
    thumbnail: null,
  },
});

// 1. 세션 선택 리스트 호출
describe('세션 선택 리스트 호출하기', () => {
  test('세션 선택 리스트의 sessions가 값이 있는 배열인가', () => {
    expect(productDetailResponses().data.sessions).toBeDefined();
    expect(productDetailResponses().data.sessions.length).toBeGreaterThan(0);
  });
});
