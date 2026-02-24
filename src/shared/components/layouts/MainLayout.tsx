import { cn } from '@/shared';
import { useSelector, useDispatch } from 'react-redux';
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';
import { Outlet } from 'react-router-dom';
import AlarmContainer from '@/widgets/alarm-container/AlarmContainer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { LOGIN, LOGOUT } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';
import { api } from '@/shared/lib/api';
import { useEffect } from 'react';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { getMember } = useMember();
  
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  useEffect(() => {
    const checkInitialAuth = async () => {
      const storedLoginState = localStorage.getItem('isLoggedIn');
      
      if (storedLoginState && JSON.parse(storedLoginState)) {
        try {
          // 로컬스토리지에 로그인 상태가 있다면 서버 확인
          await api.get('/members/me');
          dispatch({ type: LOGIN });
          getMember.mutate();
        } catch (error) {
          // 서버에서 인증 실패 시 로그아웃 처리
          dispatch({ type: LOGOUT });
          localStorage.setItem('isLoggedIn', JSON.stringify(false));
        }
      }
    };

    checkInitialAuth();
  }, [dispatch, getMember]);

  return (
    <div className={cn('main__layout')}>
      {isLoggedIn && <AlarmContainer />}
      <TopHeader />
      <BottomHeader />
      <Outlet />
    </div>
  );
};

export default MainLayout;
