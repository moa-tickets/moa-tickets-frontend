import HelloNewCoupon from '@/widgets/landing-page/HelloNewCoupon';
import CouponReserve from '@/widgets/landing-page/CouponReserve';
import SaleTicket from '@/widgets/landing-page/SaleTicket';
import type { DetailDataType } from '../types/types';

export const detailData: DetailDataType = {
  1: {
    isLandingPage: true,
    topDetailPageDesign: [
      '/main_banner/main_slide_1_detail_1.png',
      '/main_banner/main_slide_1_detail_2.png',
    ],
    activeMenus: [
      {
        menuName: '스포트라이트|이달의 신작',
        eng: 'spotlight',
        component: [
          <HelloNewCoupon key="hello-new-coupon" />,
          <CouponReserve key="coupon-reserve" />,
        ],
      },
      {
        menuName: '놓쳐선 안될|이달의 특가',
        eng: 'saleTicket',
        component: [<SaleTicket key="sale-ticket" />],
      },
    ],
  },
  6: {
    concertTitle: '2026 10CM Asia Tour 〈To 10CM: Chapter 1〉 in Seoul',
    genre: '콘서트',
    thumbnail: '/main_banner/main_slide_6_detail_2.png',
    loc: '블루스퀘어 SOL트래블홀',
    date: '2026.01.30 ~2026.02.08',
    age: '8세이상 관람가능',
    price: {
      all: 132000,
    },
    benefits: ['무이자할부'],
    delivery: {
      date: '2026년 01월 08일 일괄 배송되는 상품입니다.',
      details:
        '(1주차 공연) 일괄배송일 : 1월 8일(목) ~1월 9일(금), 2일간 / (2주차 공연) 일괄배송일 : 1월 14일(수) ~1월 16일(금), 3일간',
      addressLink: '배송주소 확인',
    },
    ticketOpening: {
      membership: {
        label: '멤버십 선예매',
        date: '2025.12.26 20:00',
        daysLeft: 'D-1',
      },
      general: {
        label: '티켓오픈',
        date: '2025.12.29 20:00',
        daysLeft: 'D-4',
      },
      notice: '티켓 오픈 시간은 예고없이 변경될 수 있습니다.',
    },
    badges: {
      exclusive: true,
      safeBooking: true,
      waiting: true,
    },
    ticketcast: true,
    likeCount: 245,
    detailPageDesign: '/main_banner/main_slide_6_detail.png',
  },
};
