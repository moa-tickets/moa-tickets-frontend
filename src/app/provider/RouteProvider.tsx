import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/shared/components/layouts/MainLayout';
import MainPage from '@/pages/main/MainPage';
import SearchResult from '@/pages/search-result/SearchResult';
import LandingPage from '@/pages/landing/LandingPage';
import DetailPage from '@/pages/detail/DetailPage';

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
    ],
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={createdRouter} />;
};

export default RouteProvider;
