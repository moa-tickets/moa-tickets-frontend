import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/shared/components/layouts/MainLayout';
import MainPage from '@/pages/main/MainPage';
import AppLoading from '@/widgets/app-loading/AppLoading';

// 레이지 로딩 페이지 컴포넌트
const MyPageLayout = lazy(
  () => import(/* @vite-prefetch */ '@/shared/components/layouts/MyPageLayout'),
);
const BookingLayout = lazy(
  () => import(/* @vite-prefetch */ '@/shared/components/layouts/BookingLayout'),
);
const ProtectedRoute = lazy(() => import(/* @vite-prefetch */ '@/shared/components/ProtectedRoute'));
const SearchResult = lazy(() => import(/* @vite-prefetch */ '@/pages/search-result/SearchResult'));
const DetailPage = lazy(() => import(/* @vite-prefetch */ '@/pages/detail/DetailPage'));
const ReservationPage = lazy(
  () => import(/* @vite-prefetch */ '@/pages/reservation/ReservationPage'),
);
const ReservationDetailPage = lazy(
  () => import(/* @vite-prefetch */ '@/pages/reservation-detail/ReservationDetailPage'),
);
const BookingPage = lazy(() => import(/* @vite-prefetch */ '@/pages/booking/BookingPage'));
const PaymentPage = lazy(() => import(/* @vite-prefetch */ '@/pages/payment/PaymentPage'));
const LoginPage = lazy(() => import(/* @vite-prefetch */ '@/pages/login/LoginPage'));
const LoginCallback = lazy(
  () => import(/* @vite-prefetch */ '@/pages/login-callback/LoginCallback'),
);
const PaymentSuccessPage = lazy(
  () => import(/* @vite-prefetch */ '@/pages/payment-success/PaymentSuccessPage'),
);
const PaymentFailPage = lazy(
  () => import(/* @vite-prefetch */ '@/pages/payment-fail/PaymentFailPage'),
);
const CommunityDetailPage = lazy(
  () => import(/* @vite-prefetch */ '@/pages/community-detail/CommunityDetailPage'),
);
const StreamPage = lazy(() => import(/* @vite-prefetch */ '@/pages/stream/StreamPage'));

// Suspense 래퍼
const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType>,
) => (
  <Suspense fallback={<AppLoading />}>
    <Component />
  </Suspense>
);

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
        element: withSuspense(LoginPage),
      },
      {
        path: 'login-callback',
        element: withSuspense(LoginCallback),
      },
      {
        path: 'search/result',
        element: withSuspense(SearchResult),
      },

      {
        path: 'payment/success',
        element: withSuspense(PaymentSuccessPage),
      },
      {
        path: 'payment/fail',
        element: withSuspense(PaymentFailPage),
      },
      {
        path: 'mypage',
        element: <ProtectedRoute />,
        children: [
          {
            element: <MyPageLayout />,
            children: [
              {
                path: 'reservation',
                element: withSuspense(ReservationPage),
              },
              {
                path: 'reservation/:reservationId',
                element: withSuspense(ReservationDetailPage),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'detail/:id',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: withSuspense(DetailPage),
          },
          {
            path: 'community/:boardId',
            element: withSuspense(CommunityDetailPage),
          },
        ],
      },
    ],
  },
  {
    path: 'stream/:playbackId',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: withSuspense(StreamPage),
      },
    ],
  },
  {
    path: 'detail/:id',
    element: <ProtectedRoute />,
    children: [
      {
        element: <BookingLayout />,
        children: [
          {
            path: 'booking',
            element: withSuspense(BookingPage),
          },
          {
            path: 'payment',
            element: withSuspense(PaymentPage),
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
