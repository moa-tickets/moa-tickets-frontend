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
};
