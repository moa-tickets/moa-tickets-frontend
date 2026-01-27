import { type LoginState } from '@/entities/reducers/LoginReducer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer.isLoggedIn,
  );

  useEffect(() => {
    const cookie = Cookies.get('Authorization');

    if (cookie) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return <div>진행중입니다...</div>;
};

export default LoginCallback;
