import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { LoginState } from '@/entities/reducers/LoginReducer';

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  // MainLayout에서 이미 인증 상태를 확인했으므로, 단순히 상태만 체크
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;