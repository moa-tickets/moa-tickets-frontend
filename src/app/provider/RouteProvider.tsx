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
        ],
      },
    ],
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={createdRouter} />;
};

export default RouteProvider;
