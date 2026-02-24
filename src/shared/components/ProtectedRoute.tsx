import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/shared/lib/api';
import { LOGIN, LOGOUT, type LoginState } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';

const ProtectedRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
  const { getMember } = useMember();
  
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 서버에 인증 상태 확인
        await api.get('/members/me');
        
        // 서버 인증 성공 시
        dispatch({ type: LOGIN });
        getMember.mutate();
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
      } catch (error) {
        // 서버 인증 실패 시
        console.warn('Authentication check failed:', error);
        dispatch({ type: LOGOUT });
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [dispatch, getMember]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">인증 확인 중...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;