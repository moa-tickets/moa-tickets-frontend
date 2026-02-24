import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';
import { Outlet } from 'react-router-dom';
import AlarmContainer from '@/widgets/alarm-container/AlarmContainer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';
import { useEffect, useRef } from 'react';

const MainLayout = () => {
  const { checkAuthStatus } = useMember();
  const hasInitialized = useRef(false);
  
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  useEffect(() => {
    // 앱 초기화 시 한 번만 쿠키 기반 인증 상태 확인
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      console.log('MainLayout: Initializing auth status check...');
      checkAuthStatus.mutate();
    }
  });

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
