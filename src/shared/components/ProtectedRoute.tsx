import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMember } from '@/features/member/useMember';
import { useSelector } from 'react-redux';
import type { LoginState } from '@/entities/reducers/LoginReducer';

const ProtectedRoute = () => {
  const { getMember } = useMember();
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  useEffect(() => {
    getMember.mutate();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
