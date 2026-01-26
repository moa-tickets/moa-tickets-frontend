import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  if (false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
