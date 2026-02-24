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
      
      // localStorage에 저장된 로그인 상태 확인
      const savedLoginState = localStorage.getItem('isLoggedIn');
      
      // 이미 인증 상태가 확정되어 있다면 서버 체크 스킵
      if (savedLoginState === 'true' && isLoggedIn) {
        console.log('MainLayout: Auth already verified, skipping server check');
        setIsAuthChecking(false);
        return;
      }
      
      // 인증 상태 확인 완료 후 로딩 상태 해제
      checkAuthStatus.mutate(undefined, {
        onSettled: () => {
          console.log('MainLayout: Auth status check completed');
          setIsAuthChecking(false);
        }
      });
    }
  }, []); // 의존성 배열을 빈 배열로 변경하여 최초 1회만 실행

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
