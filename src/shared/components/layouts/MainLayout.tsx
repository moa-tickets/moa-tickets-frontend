import { cn } from '@/shared';
import { useSelector } from 'react-redux';
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';
import { Outlet } from 'react-router-dom';
import AlarmContainer from '@/widgets/alarm-container/AlarmContainer';
import type { LoginState } from '@/entities/reducers/LoginReducer';

const MainLayout = () => {
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

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
