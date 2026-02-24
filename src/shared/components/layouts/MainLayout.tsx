import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';
import { Outlet } from 'react-router-dom';
import AlarmContainer from '@/widgets/alarm-container/AlarmContainer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';
import { useEffect } from 'react';

const MainLayout = () => {
  const { checkAuthStatus } = useMember();
  
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  useEffect(() => {
    // httpOnly 쿠키 확인을 위해 항상 서버에 인증 상태 확인
    checkAuthStatus.mutate();
  }, []);

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
