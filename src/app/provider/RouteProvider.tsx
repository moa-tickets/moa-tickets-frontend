import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/shared/components/layouts/MainLayout';
import MainPage from '@/pages/main/MainPage';

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
    ],
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={createdRouter} />;
};

export default RouteProvider;
