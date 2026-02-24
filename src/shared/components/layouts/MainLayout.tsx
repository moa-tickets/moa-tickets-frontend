import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';
import { Outlet } from 'react-router-dom';
import AlarmContainer from '@/widgets/alarm-container/AlarmContainer';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';
import { useEffect, useRef, useState } from 'react';

const MainLayout = () => {
  const { checkAuthStatus } = useMember();
  const hasInitialized = useRef(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  useEffect(() => {
    // 앱 초기화 시 한 번만 쿠키 기반 인증 상태 확인
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      console.log('MainLayout: Initializing auth status check...');
      console.log('MainLayout: Current Redux isLoggedIn state:', isLoggedIn);
      
      // 인증 상태 확인 완료 후 로딩 상태 해제
      checkAuthStatus.mutate(undefined, {
        onSettled: () => {
          console.log('MainLayout: Auth status check completed');
          setIsAuthChecking(false);
        }
      });
    }
  });

  // Redux 상태 변화 감지
  useEffect(() => {
    console.log('MainLayout: Redux isLoggedIn state changed to:', isLoggedIn);
  }, [isLoggedIn]);

  // 인증 확인 중일 때는 로딩 표시
  if (isAuthChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">인증 확인 중...</div>
      </div>
    );
  }

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
