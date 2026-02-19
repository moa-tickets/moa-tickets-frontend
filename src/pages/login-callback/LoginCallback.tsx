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
        navigate('/', { replace: true });
      } catch {
        dispatch({ type: LOGOUT });
        navigate('/login', { replace: true });
      }
    };

    checkLogin();
  }, []);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
