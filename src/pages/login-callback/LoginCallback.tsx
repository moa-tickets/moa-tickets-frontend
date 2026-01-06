import { useEffect } from 'react';
import axios from 'axios';
import { useLoginData } from '@/entities/stores/useLoginData';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const { setIsLoggedIn } = useLoginData();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const res = await axios.get(
        'http://localhost:8080/test/api/auth/status',
        {
          withCredentials: true,
        },
      );
      setIsLoggedIn(res.data.loggedIn);

      if (res.data.loggedIn) {
        navigate('/');
      } else {
        navigate('/login');
      }
    };

    checkLogin();
  }, []);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
