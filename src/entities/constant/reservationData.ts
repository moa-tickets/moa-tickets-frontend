export type ReservationItem = {
  id: string;
  ticketName: string;
  viewingDateTime: string;
  quantity: string;
  cancelableDate: string;
  status: string;
  detailId?: number; // detail 페이지 ID 연결
};

export type ReservationDetailData = {
  reservationId: string;
  detailId: number;
  concertTitle: string;
  genre: string;
  location: string;
  date: string;
  age: string;
  viewingDateTime: string;
  quantity: string;
  seatInfo?: {
    section: string;
    row: string;
    seatNumbers: string[];
  }[];
  price: {
    total: number;
    breakdown: {
      ticket: number;
      fee: number;
    };
  };
  paymentMethod: string;
  paymentDate: string;
  cancelableDate: string;
  status: string;
  delivery?: {
    date: string;
    address: string;
  };
};

export const reservationData: ReservationItem[] = [
  {
    id: '145435',
    ticketName: 'YOASOBI ASIA TOUR 2024',
    viewingDateTime: '2024.12.03 18:00',
    quantity: '2매',
    cancelableDate: '2024.11.01',
    status: '검토 중',
    detailId: 6, // detail/6과 연결
  },
];

// 예매 추가 함수
export const addReservation = (
  reservation: ReservationItem,
  detail: ReservationDetailData,
) => {
  reservationData.push(reservation);
  reservationDetailData[detail.reservationId] = detail;
};

export const reservationDetailData: { [key: string]: ReservationDetailData } = {
  '145435': {
    reservationId: '145435',
    detailId: 6,
    concertTitle: '2026 10CM Asia Tour 〈To 10CM: Chapter 1〉 in Seoul',
    genre: '콘서트',
    location: '블루스퀘어 SOL트래블홀',
    date: '2026.01.30 ~2026.02.08',
    age: '8세이상 관람가능',
    viewingDateTime: '2024.12.03 18:00',
    quantity: '2매',
    seatInfo: [
      {
        section: 'VIP',
        row: 'A',
        seatNumbers: ['1', '2'],
      },
    ],
    price: {
      total: 400000,
      breakdown: {
        ticket: 400000,
        fee: 0,
      },
    },
    paymentMethod: '신용카드',
    paymentDate: '2024.11.15 14:30',
    cancelableDate: '2024.11.01',
    status: '검토 중',
    delivery: {
      date: '2026년 01월 08일 일괄 배송되는 상품입니다.',
      address: '서울시 강남구 테헤란로 123',
    },
  },
};
