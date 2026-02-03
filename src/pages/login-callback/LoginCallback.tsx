import { LOGIN, LOGOUT } from '@/entities/reducers/LoginReducer';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get(`/api/members/me`, {
          withCredentials: true,
        });
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