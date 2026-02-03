import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const ls = localStorage.getItem('isLoggedIn');

  if (ls) {
    const parsed = JSON.parse(ls);

    if (!parsed) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  }
};

export default ProtectedRoute;