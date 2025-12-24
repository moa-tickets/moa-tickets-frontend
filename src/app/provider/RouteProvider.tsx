import { createBrowserRouter, RouterProvider } from "react-router-dom";

const createdRouter = createBrowserRouter([
  {
    // 레이아웃이 필요한 페이지 셋팅하기
    path: "/",
    element: <div>test</div>,
    children: [],
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={createdRouter} />;
};

export default RouteProvider;
