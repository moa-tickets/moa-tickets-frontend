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
    const hasAuthCookie = checkAuthCookie();

    if (hasAuthCookie) {
      setIsLoggedIn(true);
      getLoginData.mutate();
      navigate('/');
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, []);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
