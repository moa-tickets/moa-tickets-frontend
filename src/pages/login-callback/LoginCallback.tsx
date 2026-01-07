import { useEffect, useRef } from 'react';
import { useLoginData } from '@/entities/stores/useLoginData';
import { useNavigate } from 'react-router-dom';
import { checkAuthCookie } from '@/shared/lib/cookieUtils';
import { useLoginDataFunction } from '@/features/login/useLoginDataFunction';

const LoginCallback = () => {
  const { setIsLoggedIn } = useLoginData();
  const navigate = useNavigate();
  const { getLoginData } = useLoginDataFunction();
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    // 이미 시도했다면 다시 실행하지 않음
    if (hasAttemptedRef.current) {
      return;
    }

    const attemptLogin = () => {
      const hasAuthCookie = checkAuthCookie();

      if (hasAuthCookie) {
        hasAttemptedRef.current = true;

        // 쿠키가 있으면 바로 리다이렉트
        navigate('/');

        // 백그라운드에서 사용자 데이터 가져오기
        // getLoginData의 onSuccess에서 이미 setIsLoggedIn(true)와 setUserData를 설정함
        getLoginData.mutate();
        return true;
      }
      return false;
    };

    // 즉시 시도
    if (attemptLogin()) {
      return;
    }

    // 쿠키가 없으면 재시도 (OAuth 리다이렉트 후 쿠키 설정 지연 고려)
    const retryTimeout = setTimeout(() => {
      if (!attemptLogin()) {
        hasAttemptedRef.current = true;
        setIsLoggedIn(false);
        navigate('/login');
      }
    }, 500); // 500ms 후 재시도

    return () => clearTimeout(retryTimeout);
  }, [setIsLoggedIn]);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
