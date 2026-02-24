import { LOGIN, LOGOUT } from '@/entities/reducers/LoginReducer';
import { api } from '@/shared/lib/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get('/members/me');
        dispatch({ type: LOGIN });
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        navigate('/', { replace: true });
      } catch {
        dispatch({ type: LOGOUT });
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        navigate('/login', { replace: true });
      }
    };

    checkLogin();
  }, [dispatch, navigate]);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
