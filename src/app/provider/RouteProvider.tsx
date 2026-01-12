import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/shared/components/layouts/MainLayout';
import MyPageLayout from '@/shared/components/layouts/MyPageLayout';
import MainPage from '@/pages/main/MainPage';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

// 레이지 로딩 페이지 컴포넌트
const SearchResult = lazy(() => import('@/pages/search-result/SearchResult'));
const LandingPage = lazy(() => import('@/pages/landing/LandingPage'));
const DetailPage = lazy(() => import('@/pages/detail/DetailPage'));
const ReservationPage = lazy(
  () => import('@/pages/reservation/ReservationPage'),
);
const ReservationDetailPage = lazy(
  () => import('@/pages/reservation-detail/ReservationDetailPage'),
);
const BookingPage = lazy(() => import('@/pages/booking/BookingPage'));
const PaymentPage = lazy(() => import('@/pages/payment/PaymentPage'));
const StreamPage = lazy(() => import('@/pages/stream/StreamPage'));
const InquiryPage = lazy(() => import('@/pages/inquiry/InquiryPage'));
const InquiryWrite = lazy(() => import('@/pages/inquiry-write/InquiryWrite'));
const InquiryEdit = lazy(() => import('@/pages/inquiry-edit/InquiryEdit'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const LoginCallback = lazy(
  () => import('@/pages/login-callback/LoginCallback'),
);
const PaymentSuccessPage = lazy(
  () => import('@/pages/payment/PaymentSuccessPage'),
);
const PaymentFailPage = lazy(() => import('@/pages/payment/PaymentFailPage'));
const SelectInquiry = lazy(
  () => import('@/pages/select-inquiry/SelectInquiry'),
);
const InquiryDetail = lazy(
  () => import('@/pages/inquiry-detail/InquiryDetail'),
);

// 로딩 폴백 컴포넌트
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

// Suspense 래퍼
const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType>,
) => (
  <Suspense fallback={<PageLoader />}>
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
        element: withSuspense(MainPage),
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
        path: 'landing/:id',
        element: withSuspense(LandingPage),
      },
      {
        path: 'detail/:id',
        element: withSuspense(DetailPage),
      },
      {
        path: 'detail/:id/booking',
        element: withSuspense(BookingPage),
      },
      {
        path: 'detail/:id/payment',
        element: withSuspense(PaymentPage),
      },
      {
        path: 'inquiry-write',
        element: withSuspense(InquiryWrite),
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
              {
                path: 'inquiry',
                element: withSuspense(InquiryPage),
              },
              {
                path: 'selectInquiry',
                element: withSuspense(SelectInquiry),
              },
              {
                path: 'inquiry/:inquiryId',
                element: withSuspense(InquiryDetail),
              },
              {
                path: 'inquiry/:inquiryId/edit',
                element: withSuspense(InquiryEdit),
              },
            ],
          },
        ],
      },
      {
        path: 'payments/success',
        element: withSuspense(PaymentSuccessPage),
      },
      {
        path: 'payments/fail',
        element: withSuspense(PaymentFailPage),
      },
    ],
  },
  {
    path: 'live/:playbackId',
    element: withSuspense(StreamPage),
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={createdRouter} />;
};

export default RouteProvider;
