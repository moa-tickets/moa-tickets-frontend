import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/shared/components/layouts/MainLayout';
import MyPageLayout from '@/shared/components/layouts/MyPageLayout';
import MainPage from '@/pages/main/MainPage';
import SearchResult from '@/pages/search-result/SearchResult';
import LandingPage from '@/pages/landing/LandingPage';
import DetailPage from '@/pages/detail/DetailPage';
import ReservationPage from '@/pages/reservation/ReservationPage';
import ReservationDetailPage from '@/pages/reservation-detail/ReservationDetailPage';
import BookingPage from '@/pages/booking/BookingPage';
import PaymentPage from '@/pages/payment/PaymentPage';
import InquiryPage from '@/pages/inquiry/InquiryPage';
import InquiryWrite from '@/pages/inquiry-write/InquiryWrite';
import LoginPage from '@/pages/login/LoginPage';
import LoginCallback from '@/pages/login-callback/LoginCallback';

const createdRouter = createBrowserRouter([
  {
    // 레이아웃이 필요한 페이지 셋팅하기
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'login-callback',
        element: <LoginCallback />,
      },
      {
        path: 'search/result',
        element: <SearchResult />,
      },
      {
        path: 'landing/:id',
        element: <LandingPage />,
      },
      {
        path: 'detail/:id',
        element: <DetailPage />,
      },
      {
        path: 'detail/:id/booking',
        element: <BookingPage />,
      },
      {
        path: 'detail/:id/payment',
        element: <PaymentPage />,
      },
      {
        path: 'inquiry-write',
        element: <InquiryWrite />,
      },
      {
        path: 'mypage',
        element: <MyPageLayout />,
        children: [
          {
            path: 'reservation',
            element: <ReservationPage />,
          },
          {
            path: 'reservation/:reservationId',
            element: <ReservationDetailPage />,
          },
          {
            path: 'inquiry',
            element: <InquiryPage />,
          },
        ],
      },
    ],
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={createdRouter} />;
};

export default RouteProvider;
