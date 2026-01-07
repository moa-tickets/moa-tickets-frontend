import { useEffect } from 'react';
import { useLoginData } from '@/entities/stores/useLoginData';
import { useNavigate } from 'react-router-dom';
import { checkAuthCookie } from '@/shared/lib/cookieUtils';
import { useLoginDataFunction } from '@/features/login/useLoginDataFunction';

const LoginCallback = () => {
  const { setIsLoggedIn } = useLoginData();
  const navigate = useNavigate();
  const { getLoginData } = useLoginDataFunction();

  useEffect(() => {
    // 디버깅: 모든 쿠키 확인
    console.log('All cookies:', document.cookie);

    const attemptLogin = () => {
      const hasAuthCookie = checkAuthCookie();
      console.log('Has auth cookie:', hasAuthCookie);

      if (hasAuthCookie) {
        console.log('Auth cookie found, redirecting to home...');
        setIsLoggedIn(true);

        // 쿠키가 있으면 바로 리다이렉트
        navigate('/');

        // 백그라운드에서 사용자 데이터 가져오기
        getLoginData.mutate(undefined, {
          onSuccess: (data) => {
            console.log('User data fetched successfully:', data);
            // getLoginData의 onSuccess에서 이미 setIsLoggedIn(true)와 setUserData를 설정함
          },
          onError: (error) => {
            console.error('Failed to fetch user data:', error);
            // 에러가 발생해도 이미 리다이렉트되었으므로 로그만 남김
          },
        });
        return true;
      }
      return false;
    };

    // 즉시 시도
    if (attemptLogin()) {
      return;
    }

    // 쿠키가 없으면 재시도 (OAuth 리다이렉트 후 쿠키 설정 지연 고려)
    console.log('no auth cookie - will retry in 500ms');
    console.log(
      'Available cookies:',
      document.cookie.split(';').map((c) => c.trim()),
    );

    const retryTimeout = setTimeout(() => {
      console.log('Retrying login check...');
      if (!attemptLogin()) {
        console.log('Still no auth cookie after retry, redirecting to login');
        setIsLoggedIn(false);
        navigate('/login');
      }
    }, 500); // 500ms 후 재시도

    return () => clearTimeout(retryTimeout);
  }, [navigate, setIsLoggedIn, getLoginData]);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
